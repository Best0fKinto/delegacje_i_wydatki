# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## DEV Quickstart

### Backend Setup (Flask API)

1. Navigate to the backend directory:
   ```powershell
   cd Delegation_main
   ```

2. Start the backend with Docker Compose:
   ```powershell
   docker compose up --build
   ```

   The backend API will be available at `http://localhost:5000`

### Frontend Setup (React + Vite)

1. Install dependencies (from root directory):
   ```powershell
   npm install
   ```

2. Start the development server:
   ```powershell
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173` (or another port shown in console)

### Testing the Integration

#### Test User Credentials (DEV only)

**⚠️ Test user seeding is DISABLED by default for security.**

To enable test user creation, add to `Delegation_main/.env`:
```bash
DEV_SEED=true
```

Then restart the backend. The following test user will be created:

- **Email:** `adamas@example.com`
- **Password:** `12345678`

**To disable seed:** Remove or set `DEV_SEED=false` in your local `.env` file.

1. **Test Login**:
   - Open browser DevTools (F12) → Network tab
   - Navigate to your app and attempt to login (or manually test):
   ```javascript
   // In browser console:
   fetch('http://localhost:5000/api/auth/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email: 'test@example.com', password: 'password' })
   }).then(r => r.json()).then(console.log)
   ```

2. **Test Delegations** (with token):
   - After login, token is stored in localStorage
   - Navigate to delegations page
   - Check Network tab for:
     - `GET http://localhost:5000/api/delegations`
     - Should include `Authorization: Bearer <token>` header
     - Should return JSON array of delegations

3. **Create Delegation**:
   - Navigate to "Create Delegation" page
   - Fill in dates
   - Submit form
   - Check Network tab for:
     - `POST http://localhost:5000/api/delegations`
     - Request body with `start_date`, `end_date`, `status`
     - Response with created delegation object

### API Documentation

Full API contract is available in: `Delegation_main/ENDPOINTS.md`

All API endpoints are prefixed with `/api` and most require `Authorization: Bearer <token>` header.

### Environment Variables

- **Frontend:** `.env.local` (not committed, copy from `.env.example`)
  - `VITE_API_URL` - Backend API URL (default: `http://localhost:5000`)

- **Backend:** `Delegation_main/.env` (not committed, copy from `.env.example`)
  - `DATABASE_URL` - PostgreSQL connection string
  - `JWT_SECRET_KEY` - Secret key for JWT tokens
  - `DEV_SEED` - Set to `true` to enable test user creation (default: disabled)

#### How to Enable Test Users (DEV):

1. In `Delegation_main/.env`, add or uncomment:
   ```bash
   DEV_SEED=true
   ```

2. Restart backend:
   ```powershell
   docker compose restart server
   # or if running locally:
   python app.py
   ```

3. Check logs for confirmation:
   ```
   [SEED] ✓ Created test user: 'adamas' (adamas@example.com)
   ```

#### How to Disable Test Users:

1. In `Delegation_main/.env`, remove the line or set:
   ```bash
   DEV_SEED=false
   ```

2. Restart backend

**Note:** Test users are only created once. If already exists, seed will skip creation.

---

## React Configuration

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
