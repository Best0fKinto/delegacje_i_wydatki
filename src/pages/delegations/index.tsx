import styled from "styled-components";
import { useEffect, useState } from "react";
import { colors } from "src/constants/colors";
import { Delegation, DelegationProps } from "./components/delegation";
import { delegationsApi } from "src/lib/api/delegations";
import type { Delegation as DelegationType } from "src/lib/api/delegations";

const S = {
  Wrapper: styled.section`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,
  Heading: styled.h1`
    margin-block: 32px;
    color: ${colors.grey[8]};
  `,
  DelegationList: styled.ol`
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    padding-inline: 60px;
    max-width: 1200px;
    box-sizing: border-box;
    gap: 16px;
  `,
  LoadingMessage: styled.p`
    color: ${colors.grey[6]};
    font-size: 16px;
  `,
  ErrorMessage: styled.p`
    color: ${colors.red[1]};
    font-size: 16px;
  `,
};

// Map backend status to frontend status
const mapStatus = (status: string): "Accepted" | "Pending" | "Rejected" => {
  const normalized = status.toLowerCase();
  if (normalized === "accepted" || normalized === "approved") return "Accepted";
  if (normalized === "rejected") return "Rejected";
  return "Pending"; // draft, pending, etc.
};

export default function DelegationsPage() {
  const [delegations, setDelegations] = useState<DelegationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDelegations = async () => {
      try {
        setLoading(true);
        const data = await delegationsApi.getDelegations();
        setDelegations(data);
        setError(null);
      } catch (err: any) {
        setError(err?.data?.message || 'Nie udało się pobrać delegacji');
        console.error('Failed to fetch delegations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDelegations();
  }, []);

  if (loading) {
    return (
      <S.Wrapper>
        <S.Heading>Moje delegacje</S.Heading>
        <S.LoadingMessage>Ładowanie delegacji...</S.LoadingMessage>
      </S.Wrapper>
    );
  }

  if (error) {
    return (
      <S.Wrapper>
        <S.Heading>Moje delegacje</S.Heading>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Heading>Moje delegacje</S.Heading>
      {delegations.length === 0 ? (
        <S.LoadingMessage>Brak delegacji do wyświetlenia</S.LoadingMessage>
      ) : (
        <S.DelegationList>
          {delegations.map((delegation) => (
            <li key={delegation.id}>
              <Delegation
                id={delegation.id}
                name={delegation.name || `Delegacja #${delegation.id}`}
                dateFrom={delegation.start_date}
                dateTo={delegation.end_date}
                status={mapStatus(delegation.status)}
              />
            </li>
          ))}
        </S.DelegationList>
      )}
    </S.Wrapper>
  );
}