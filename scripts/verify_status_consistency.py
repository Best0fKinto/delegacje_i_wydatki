import os
import sys
from typing import Any, Dict, Iterable
import requests

ALLOWED_STATUSES = {"PENDING", "APPROVED", "REJECTED"}
FORBIDDEN_KEYS = {"computed" + "_status", "computed" + "_delegation_status"}


class VerifyError(Exception):
    pass


def env(name: str, default: str | None = None) -> str:
    value = os.getenv(name, default)
    if value is None:
        raise VerifyError(f"Missing required env var: {name}")
    return value


def login(base_url: str, email: str, password: str, login_path: str) -> str:
    resp = requests.post(f"{base_url}{login_path}", json={"email": email, "password": password})
    if resp.status_code != 200:
        raise VerifyError(f"Login failed for {email}: {resp.status_code} {resp.text}")
    data = resp.json()
    token = data.get("access_token") or data.get("token")
    if not token:
        raise VerifyError("Login response missing access_token/token")
    return token


def auth_get(base_url: str, path: str, token: str) -> Dict[str, Any]:
    resp = requests.get(f"{base_url}{path}", headers={"Authorization": f"Bearer {token}"})
    if resp.status_code != 200:
        raise VerifyError(f"GET {path} failed: {resp.status_code} {resp.text}")
    return resp.json()


def assert_status(value: Any, ctx: str) -> None:
    if value not in ALLOWED_STATUSES:
        raise VerifyError(f"Invalid status in {ctx}: {value}")


def assert_no_forbidden_keys(obj: Dict[str, Any], ctx: str) -> None:
    bad = FORBIDDEN_KEYS.intersection(obj.keys())
    if bad:
        raise VerifyError(f"Forbidden keys in {ctx}: {', '.join(sorted(bad))}")


def check_delegation_payload(payload: Dict[str, Any], ctx: str) -> None:
    assert_no_forbidden_keys(payload, f"{ctx}.delegation")
    assert_status(payload.get("status"), f"{ctx}.delegation.status")


def check_items(items: Iterable[Dict[str, Any]], delegation_id: Any, ctx: str) -> None:
    for item in items:
        assert_no_forbidden_keys(item, f"{ctx}.item")
        assert_status(item.get("status"), f"{ctx}.item.status")
        if item.get("delegation_id") != delegation_id:
            raise VerifyError(f"Item delegation_id mismatch in {ctx}: {item.get('id')} has {item.get('delegation_id')} expected {delegation_id}")


def check_employee(employee: Dict[str, Any], delegation: Dict[str, Any], ctx: str) -> None:
    if employee.get("id") != delegation.get("employee_id"):
        raise VerifyError(f"Employee mismatch in {ctx}: employee.id={employee.get('id')} delegation.employee_id={delegation.get('employee_id')}")


def main() -> None:
    base_url = env("API_BASE_URL", "http://localhost:5000/api")
    login_path = os.getenv("LOGIN_PATH", "/auth/login")

    admin_user = env("ADMIN_EMAIL")
    admin_pass = env("ADMIN_PASSWORD")
    manager_user = env("MANAGER_EMAIL")
    manager_pass = env("MANAGER_PASSWORD")

    employee_id = env("EMPLOYEE_ID_TO_TEST", "4")
    delegation_id = os.getenv("DELEGATION_ID_TO_TEST")

    admin_token = login(base_url, admin_user, admin_pass, login_path)
    manager_token = login(base_url, manager_user, manager_pass, login_path)

    admin_emp = auth_get(base_url, f"/admin/employees/{employee_id}", admin_token)

    # pick delegation id if not provided
    if not delegation_id:
        delegations = admin_emp.get("delegations", [])
        if not delegations:
            raise VerifyError("No delegations available for provided employee; set DELEGATION_ID_TO_TEST")
        delegation_id = str(delegations[0].get("id"))

    admin_del = auth_get(base_url, f"/admin/delegations/{delegation_id}", admin_token)

    mgr_emp = auth_get(base_url, f"/manager/employees/{employee_id}", manager_token)
    mgr_del = auth_get(base_url, f"/manager/delegations/{delegation_id}", manager_token)

    # Admin employee delegations
    for d in admin_emp.get("delegations", []):
        assert_no_forbidden_keys(d, "admin employee delegation")
        assert_status(d.get("status"), "admin employee delegation.status")

    # Admin delegation details
    delegation = admin_del.get("delegation", {})
    employee = admin_del.get("employee", {})
    items = admin_del.get("items", [])
    check_delegation_payload(delegation, "admin delegation")
    check_employee(employee, delegation, "admin delegation")
    check_items(items, delegation.get("id"), "admin delegation")

    # Manager employee delegations
    for d in mgr_emp.get("delegations", []):
        assert_no_forbidden_keys(d, "manager employee delegation")
        assert_status(d.get("status"), "manager employee delegation.status")

    # Manager delegation details
    m_delegation = mgr_del.get("delegation", {})
    m_employee = mgr_del.get("employee", {})
    m_items = mgr_del.get("items", [])
    check_delegation_payload(m_delegation, "manager delegation")
    check_employee(m_employee, m_delegation, "manager delegation")
    check_items(m_items, m_delegation.get("id"), "manager delegation")

    print("OK")


if __name__ == "__main__":
    try:
        main()
    except VerifyError as e:
        sys.exit(f"FAIL: {e}")
