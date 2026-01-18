#!/usr/bin/env python3
import requests
import json
import random
import string

BASE_URL = "http://localhost:5000/api"

def random_str(length=8):
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

# Step 1: Login
print("[TEST] Logging in as admin...")
login_resp = requests.post(f"{BASE_URL}/auth/login", json={
    "email": "admin@example.com",
    "password": "12345678"
})
print(f"Login status: {login_resp.status_code}")
login_data = login_resp.json()
token = login_data['token']
headers = {"Authorization": f"Bearer {token}"}
print(f"Token: {token[:50]}...\n")

# Test 1: Create manager with random data
print("="*60)
print("TEST 1: Create manager with random username/email (should be 201)")
print("="*60)
username1 = f"mgr_{random_str()}"
email1 = f"mgr_{random_str()}@example.com"
data1 = {
    "username": username1,
    "email": email1,
    "password": "12345678",
    "role": "manager"
}
print(f"Request data: {json.dumps(data1, indent=2)}")
resp1 = requests.post(f"{BASE_URL}/admin/employees", json=data1, headers=headers)
print(f"Response status: {resp1.status_code}")
print(f"Response body: {json.dumps(resp1.json(), indent=2)}\n")

# Test 2: Try to create same email (should be 409 with field=email)
print("="*60)
print("TEST 2: Try to create with same email (should be 409 field=email)")
print("="*60)
data2 = {
    "username": f"different_{random_str()}",
    "email": email1,  # Same email as Test 1
    "password": "12345678",
    "role": "manager"
}
print(f"Request data: {json.dumps(data2, indent=2)}")
resp2 = requests.post(f"{BASE_URL}/admin/employees", json=data2, headers=headers)
print(f"Response status: {resp2.status_code}")
print(f"Response body: {json.dumps(resp2.json(), indent=2)}\n")

# Test 3: Try to create same username (should be 409 with field=username)
print("="*60)
print("TEST 3: Try to create with same username (should be 409 field=username)")
print("="*60)
data3 = {
    "username": username1,  # Same username as Test 1
    "email": f"different_{random_str()}@example.com",
    "password": "12345678",
    "role": "manager"
}
print(f"Request data: {json.dumps(data3, indent=2)}")
resp3 = requests.post(f"{BASE_URL}/admin/employees", json=data3, headers=headers)
print(f"Response status: {resp3.status_code}")
print(f"Response body: {json.dumps(resp3.json(), indent=2)}\n")

# Summary
print("="*60)
print("SUMMARY")
print("="*60)
print(f"Test 1 (create new): {resp1.status_code} {'✓' if resp1.status_code == 201 else '✗'}")
print(f"Test 2 (duplicate email): {resp2.status_code} {'✓' if resp2.status_code == 409 else '✗'}")
print(f"Test 3 (duplicate username): {resp3.status_code} {'✓' if resp3.status_code == 409 else '✗'}")
