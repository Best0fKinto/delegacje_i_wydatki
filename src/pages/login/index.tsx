import styled from "styled-components";
import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import { colors } from "src/constants/colors";
import { TextField } from "@mui/material";
import { Button } from "src/components/button";
import { authApi } from "src/lib/api/auth";
import { routes } from "src/constants/routes";
import { getToken } from "src/lib/apiClient";
import { useAuth } from "src/contexts/AuthContext";

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, ${colors.navy[2]} 0%, ${colors.blue[1]} 100%);
  `,
  LoginCard: styled.div`
    background: ${colors.white};
    padding: 48px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
  `,
  Title: styled.h1`
    margin: 0 0 32px 0;
    color: ${colors.navy[2]};
    text-align: center;
    font-size: 28px;
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  TextField: styled(TextField)`
    width: 100%;
  `,
  SubmitButton: styled(Button)`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: 600;
  `,
  ErrorMessage: styled.p`
    color: ${colors.red[1]};
    font-size: 14px;
    margin: 0;
    text-align: center;
  `,
  InfoMessage: styled.p`
    color: ${colors.grey[3]};
    font-size: 14px;
    margin: 0;
    text-align: center;
  `,
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { refetchUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate(routes.delegations, { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Proszę wypełnić wszystkie pola");
      return;
    }

    try {
      setIsLoading(true);
      
      // authApi.login automatically saves token to localStorage
      await authApi.login({
        email: email.trim(),
        password: password,
      });

      // Fetch user data to populate AuthContext
      await refetchUser();
      
      // Get user role to determine redirect
      const meResponse = await authApi.me();
      const userRole = meResponse.employee.role;
      
      // Redirect based on user role
      if (userRole === 'admin') {
        navigate(routes.adminDashboard);
      } else if (userRole === 'manager') {
        navigate(routes.managerDashboard);
      } else {
        navigate(routes.delegations);
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      
      if (err?.statusCode === 401) {
        setError("Nieprawidłowy email lub hasło");
      } else if (err?.statusCode === 403) {
        setError("Konto jest nieaktywne");
      } else {
        setError(err?.data?.message || "Błąd logowania. Spróbuj ponownie.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Wrapper>
      <S.LoginCard>
        <S.Title>Delegacje i wydatki</S.Title>
        <S.Form onSubmit={handleSubmit}>
          <S.TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            autoComplete="email"
            autoFocus
          />
          <S.TextField
            label="Hasło"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            autoComplete="current-password"
          />
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Logowanie..." : "Zaloguj"}
          </S.SubmitButton>
          <S.InfoMessage>
            Zaloguj się, aby zarządzać delegacjami i wydatkami
          </S.InfoMessage>
        </S.Form>
      </S.LoginCard>
    </S.Wrapper>
  );
}
