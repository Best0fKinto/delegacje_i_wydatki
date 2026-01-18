# Test: Lista pracowników menedżera

## Zmienione pliki

### Backend:
1. **`Delegation_main/routes/manager.py`**
   - Dodano endpoint `GET /api/manager/employees`
   - Dodano funkcję helper `_create_test_employees_for_manager()`
   - Auto-seed: tworzy 3 testowych pracowników gdy DEV_SEED=true i lista jest pusta

### Frontend:
2. **`src/lib/api/manager.ts`**
   - Przepisano `listMyEmployees()` aby używać nowego endpointu `/manager/employees`
   - Dodano typ `ManagerEmployeesResponse`

3. **`src/pages/manager/dashboard/index.tsx`**
   - Już poprawnie implementuje wyświetlanie listy
   - Obsługuje pusty stan: "Brak przypisanych pracowników"
   - Obsługuje błędy (w tym 401)

---

## Komendy testowe

### 1. Restart backendu (jeśli potrzeba)
```powershell
cd C:\Users\wikto\projekty\delegacje_i_wydatki\Delegation_main
docker compose restart server
```

### 2. Sprawdź logi
```powershell
docker logs flask_server 2>&1 | Select-Object -Last 20
```

### 3. Test API (curl/PowerShell)

#### Zaloguj się jako menedżer:
```powershell
$loginBody = @{ 
    email = 'menedzer@example.com'
    password = '12345678' 
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod `
    -Uri 'http://localhost:5000/api/auth/login' `
    -Method Post `
    -Body $loginBody `
    -ContentType 'application/json'

$token = $loginResponse.token
```

#### Pobierz listę pracowników:
```powershell
$headers = @{ Authorization = "Bearer $token" }
$response = Invoke-RestMethod `
    -Uri 'http://localhost:5000/api/manager/employees' `
    -Method Get `
    -Headers $headers

$response.employees | Format-Table
```

**Oczekiwany wynik:**
- Jeśli menedżer ma pracowników → zwraca ich listę
- Jeśli menedżer nie ma pracowników i DEV_SEED=true → automatycznie tworzy 3 testowych:
  - `pracownik_test1` / `test1@manager2.com`
  - `pracownik_test2` / `test2@manager2.com`
  - `pracownik_test3` / `test3@manager2.com`

### 4. Test Frontend

#### Uruchom dev server (jeśli nie działa):
```powershell
cd C:\Users\wikto\projekty\delegacje_i_wydatki
npm run dev
```

#### Otwórz w przeglądarce:
```
http://localhost:5173/login
```

#### Dane logowania menedżera:
- **Email:** `menedzer@example.com`
- **Hasło:** `12345678`

Po zalogowaniu zostaniesz przekierowany na `/manager/dashboard` gdzie zobaczysz:
- Listę pracowników w kartach (username + email)
- Możliwość kliknięcia w pracownika (przekierowanie do szczegółów)
- Jeśli brak pracowników: "Brak przypisanych pracowników"

---

## Weryfikacja w bazie danych

### Sprawdź pracowników w bazie:
```powershell
docker exec postgres_db psql -U postgres -d delegation -c `
    "SELECT id, username, email, manager_id, role FROM employee ORDER BY id;"
```

### Sprawdź pracowników przypisanych do menedżera (id=2):
```powershell
docker exec postgres_db psql -U postgres -d delegation -c `
    "SELECT id, username, email, manager_id FROM employee WHERE manager_id = 2;"
```

---

## Funkcje zaimplementowane

✅ Backend endpoint `GET /api/manager/employees`  
✅ Pobiera manager_id z JWT tokenu  
✅ Zwraca tylko pracowników gdzie `manager_id == current_manager.id`  
✅ Auto-seed w DEV: tworzy 3 testowych pracowników jeśli lista pusta  
✅ Seed idempotentny: nie tworzy duplikatów  
✅ Hasła hashowane bcryptem  
✅ Frontend pobiera dane z nowego endpointu  
✅ Frontend wyświetla listę w tabeli/kartach  
✅ Obsługa pustego stanu  
✅ Obsługa błędów 401/403  
✅ Używa istniejącego apiClient z Authorization header  

---

## Dodatkowe informacje

### Testowi pracownicy z głównego seeda:
- **Pracownik:** `pracownik@example.com` / `12345678` (przypisany do menedżera id=2 przez seed_users.py)
- **Menedżer:** `menedzer@example.com` / `12345678` (id=2)
- **Admin:** `admin@example.com` / `12345678`

### Automatycznie utworzeni testowi pracownicy (przez endpoint):
- `pracownik_test1` / `test1@manager2.com` / `12345678`
- `pracownik_test2` / `test2@manager2.com` / `12345678`
- `pracownik_test3` / `test3@manager2.com` / `12345678`

Wszystkie konta używają tego samego hasła dla wygody w DEV.
