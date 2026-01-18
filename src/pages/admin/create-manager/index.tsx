import styled from "styled-components";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { colors } from "src/constants/colors";
import { TextField } from "@mui/material";
import { Button } from "src/components/button";
import { adminApi } from "src/lib/api";
import { routes } from "src/constants/routes";

const S = {
  Wrapper: styled.section`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,
  Header: styled.div`
    width: 100%;
    max-width: 800px;
    padding-inline: 60px;
    box-sizing: border-box;
  `,
  BackButton: styled.button`
    background: none;
    border: none;
    color: ${colors.blue[1]};
    cursor: pointer;
    font-size: 14px;
    padding: 8px 0;
    margin-bottom: 16px;

    &:hover {
      text-decoration: underline;
    }
  `,
  Heading: styled.h1`
    margin: 0 0 32px 0;
    color: ${colors.grey[8]};
  `,
  Form: styled.form`
    width: 100%;
    max-width: 800px;
    padding-inline: 60px;
    box-sizing: border-box;
    background: ${colors.white};
    border: 1px solid ${colors.grey[2]};
    border-radius: 8px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  TextField: styled(TextField)`
    width: 100%;
  `,
  ButtonGroup: styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  `,
  ErrorMessage: styled.p`
    color: ${colors.red[1]};
    font-size: 14px;
    margin: 0;
  `,
  SuccessMessage: styled.p`
    color: ${colors.green[2]};
    font-size: 14px;
    margin: 0;
  `,
};

export default function CreateManagerPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate(routes.adminDashboard);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username || !email || !password) {
      setError("Wszystkie pola są wymagane");
      return;
    }

    if (password.length < 8) {
      setError("Hasło musi mieć minimum 8 znaków");
      return;
    }

    try {
      setIsLoading(true);
      
      await adminApi.createManager({
        username,
        email,
        password,
      });

      setSuccess(`Menedżer "${username}" został utworzony pomyślnie!`);
      
      // Clear form
      setUsername("");
      setEmail("");
      setPassword("");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate(routes.adminDashboard);
      }, 2000);
    } catch (err: any) {
      console.error("Failed to create manager:", err);
      
      // Handle duplicate error with field info
      if (err?.data?.error === 'DUPLICATE') {
        const field = err?.data?.field || 'unknown';
        const message = err?.data?.message || 'This value already exists';
        setError(`${field === 'email' ? 'Email' : 'Nazwa użytkownika'}: ${message}`);
      } else {
        setError(err?.data?.message || 'Nie udało się utworzyć menedżera');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.BackButton onClick={handleBack}>← Powrót do panelu</S.BackButton>
        <S.Heading>Utwórz Nowego Menedżera</S.Heading>
      </S.Header>
      
      <S.Form onSubmit={handleSubmit}>
        <S.TextField
          label="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          required
          disabled={isLoading}
        />
        
        <S.TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          required
          disabled={isLoading}
        />
        
        <S.TextField
          label="Hasło"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          required
          disabled={isLoading}
          helperText="Minimum 8 znaków"
        />

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        {success && <S.SuccessMessage>{success}</S.SuccessMessage>}

        <S.ButtonGroup>
          <Button
            type="button"
            onClick={handleBack}
            disabled={isLoading}
            variant="text"
          >
            Anuluj
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Tworzenie...' : 'Utwórz Menedżera'}
          </Button>
        </S.ButtonGroup>
      </S.Form>
    </S.Wrapper>
  );
}
