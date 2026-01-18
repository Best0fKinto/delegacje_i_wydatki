import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { colors } from "src/constants/colors";
import { managerApi, DelegationItem, DelegationDetailsSummary, EmployeeResponse, EmployeeDelegation } from "src/lib/api";
import { Button } from "src/components/button";

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
    max-width: 1200px;
    padding-inline: 60px;
    box-sizing: border-box;
  `,
  HeaderTop: styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 8px;
  `,
  DelegationStatusBadge: styled.span<{ status: string }>`
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    background: ${props => {
      const s = props.status.toUpperCase();
      if (s === 'APPROVED') return colors.green[0];
      if (s === 'REJECTED') return colors.red[0];
      return colors.yellow[0];
    }};
    color: ${props => {
      const s = props.status.toUpperCase();
      if (s === 'APPROVED') return colors.green[2];
      if (s === 'REJECTED') return colors.red[1];
      return colors.yellow[2];
    }};
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
    margin: 0 0 8px 0;
    color: ${colors.grey[8]};
  `,
  Subheading: styled.p`
    margin: 0 0 24px 0;
    color: ${colors.grey[6]};
    font-size: 14px;
  `,
  SummarySection: styled.div`
    width: 100%;
    max-width: 1200px;
    padding-inline: 60px;
    box-sizing: border-box;
    margin-bottom: 24px;
  `,
  SummaryCards: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 16px;
  `,
  SummaryCard: styled.div<{ variant?: 'total' | 'pending' | 'approved' | 'rejected' }>`
    background: ${props => {
      if (props.variant === 'approved') return colors.green[0];
      if (props.variant === 'rejected') return colors.red[0];
      if (props.variant === 'pending') return colors.yellow[0];
      return colors.white;
    }};
    border: 1px solid ${props => {
      if (props.variant === 'approved') return colors.green[1];
      if (props.variant === 'rejected') return colors.red[1];
      if (props.variant === 'pending') return colors.yellow[1];
      return colors.grey[2];
    }};
    border-radius: 8px;
    padding: 20px;
  `,
  SummaryLabel: styled.div`
    font-size: 14px;
    color: ${colors.grey[6]};
    margin-bottom: 8px;
  `,
  SummaryAmount: styled.div`
    font-size: 28px;
    font-weight: 600;
    color: ${colors.grey[8]};
  `,
  ActionsRow: styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
  `,
  ItemsList: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-inline: 60px;
    max-width: 1200px;
    box-sizing: border-box;
    gap: 12px;
  `,
  ItemCard: styled.div`
    background: ${colors.white};
    border: 1px solid ${colors.grey[2]};
    border-radius: 8px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  `,
  ItemInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  `,
  ItemName: styled.h3`
    margin: 0;
    color: ${colors.navy[2]};
    font-size: 16px;
  `,
  ItemAmount: styled.p`
    margin: 0;
    color: ${colors.grey[7]};
    font-size: 18px;
    font-weight: 600;
  `,
  ItemActions: styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
  `,
  StatusBadge: styled.span<{ status: string }>`
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    background: ${props => {
      const s = props.status.toUpperCase();
      if (s === 'APPROVED') return colors.green[0];
      if (s === 'REJECTED') return colors.red[0];
      return colors.yellow[0];
    }};
    color: ${props => {
      const s = props.status.toUpperCase();
      if (s === 'APPROVED') return colors.green[2];
      if (s === 'REJECTED') return colors.red[1];
      return colors.yellow[2];
    }};
  `,
  LoadingMessage: styled.p`
    color: ${colors.grey[6]};
    font-size: 16px;
  `,
  ErrorMessage: styled.p`
    color: ${colors.red[1]};
    font-size: 16px;
  `,
  EmptyMessage: styled.p`
    color: ${colors.grey[6]};
    font-size: 16px;
    text-align: center;
    padding: 40px;
  `,
};

export default function DelegationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [delegation, setDelegation] = useState<EmployeeDelegation | null>(null);
  const [employee, setEmployee] = useState<EmployeeResponse | null>(null);
  const [delegationStatus, setDelegationStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [items, setItems] = useState<DelegationItem[]>([]);
  const [summary, setSummary] = useState<DelegationDetailsSummary>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | string | null>(null);

  const delegationId = id ? parseInt(id, 10) : null;

  const fetchDelegationData = async () => {
    if (!delegationId) {
      setError('Invalid delegation id');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await managerApi.getDelegationDetails(delegationId);
      setDelegation(data.delegation);
      setEmployee(data.employee);
      setDelegationStatus(data.delegation.status);
      setItems(data.items);
      setSummary(data.summary);
      setError(null);
    } catch (err: any) {
      setError(err?.data?.message || 'Failed to load delegation');
      console.error('Failed to fetch delegation details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDelegationData();
  }, [delegationId]);

  const handleApproveItem = async (itemId: number) => {
    if (!delegationId) return;
    
    try {
      setActionLoading(itemId);
      await managerApi.approveItem(delegationId, itemId);
      await fetchDelegationData();
    } catch (err: any) {
      console.error('Failed to approve item:', err);
      alert(err?.data?.message || 'Could not approve this item');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectItem = async (itemId: number) => {
    if (!delegationId) return;
    
    try {
      setActionLoading(itemId);
      await managerApi.rejectItem(delegationId, itemId);
      await fetchDelegationData();
    } catch (err: any) {
      console.error('Failed to reject item:', err);
      alert(err?.data?.message || 'Could not reject this item');
    } finally {
      setActionLoading(null);
    }
  };

  const handleApproveAll = async () => {
    if (!delegationId) return;
    
    const confirmApprove = window.confirm('Approve all pending items?');
    if (!confirmApprove) return;

    try {
      setActionLoading('approve-all');
      const result = await managerApi.approveAllItems(delegationId);
      alert(`Approved ${result.count} items`);
      await fetchDelegationData();
    } catch (err: any) {
      console.error('Failed to approve all items:', err);
      alert(err?.data?.message || 'Could not approve items');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectAll = async () => {
    if (!delegationId) return;
    
    const confirmReject = window.confirm('Reject all pending items?');
    if (!confirmReject) return;

    try {
      setActionLoading('reject-all');
      const result = await managerApi.rejectAllItems(delegationId);
      alert(`Rejected ${result.count} items`);
      await fetchDelegationData();
    } catch (err: any) {
      console.error('Failed to reject all items:', err);
      alert(err?.data?.message || 'Could not reject items');
    } finally {
      setActionLoading(null);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const formatAmount = (amount: number) => {
    return `${amount.toFixed(2)} PLN`;
  };

  if (loading) {
    return (
      <S.Wrapper>
        <S.Header>
          <S.BackButton onClick={handleBack}>← Back</S.BackButton>
          <S.Heading>Delegation details</S.Heading>
        </S.Header>
        <S.LoadingMessage>Loading…</S.LoadingMessage>
      </S.Wrapper>
    );
  }

  if (error) {
    return (
      <S.Wrapper>
        <S.Header>
          <S.BackButton onClick={handleBack}>← Back</S.BackButton>
          <S.Heading>Delegation details</S.Heading>
        </S.Header>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.Wrapper>
    );
  }

  const hasPendingItems = items.some(item => item.status === 'PENDING');

  return (
    <S.Wrapper>
      <S.Header>
        <S.BackButton onClick={handleBack}>← Back</S.BackButton>
        <S.HeaderTop>
          <S.Heading>{delegation?.name || `Delegation #${delegationId}`}</S.Heading>
          <S.DelegationStatusBadge status={delegationStatus}>
            {delegationStatus.toUpperCase()}
          </S.DelegationStatusBadge>
        </S.HeaderTop>
        {employee && (
          <S.Subheading>
            Employee: {employee.first_name} {employee.last_name} • {employee.email}
          </S.Subheading>
        )}
        {delegation && (
          <S.Subheading>
            Trip dates: {delegation.start_date} → {delegation.end_date}
          </S.Subheading>
        )}
      </S.Header>

      <S.SummarySection>
        <S.SummaryCards>
          <S.SummaryCard variant="total">
            <S.SummaryLabel>Total amount</S.SummaryLabel>
            <S.SummaryAmount>{formatAmount(summary.total)}</S.SummaryAmount>
          </S.SummaryCard>
          <S.SummaryCard variant="pending">
            <S.SummaryLabel>Pending</S.SummaryLabel>
            <S.SummaryAmount>{formatAmount(summary.pending)}</S.SummaryAmount>
          </S.SummaryCard>
          <S.SummaryCard variant="approved">
            <S.SummaryLabel>Approved</S.SummaryLabel>
            <S.SummaryAmount>{formatAmount(summary.approved)}</S.SummaryAmount>
          </S.SummaryCard>
          <S.SummaryCard variant="rejected">
            <S.SummaryLabel>Rejected</S.SummaryLabel>
            <S.SummaryAmount>{formatAmount(summary.rejected)}</S.SummaryAmount>
          </S.SummaryCard>
        </S.SummaryCards>

        {hasPendingItems && (
          <S.ActionsRow>
            <Button 
              onClick={handleApproveAll}
              disabled={actionLoading !== null}
            >
              {actionLoading === 'approve-all' ? 'Approving…' : 'Approve all pending'}
            </Button>
            <Button 
              onClick={handleRejectAll}
              disabled={actionLoading !== null}
            >
              {actionLoading === 'reject-all' ? 'Rejecting…' : 'Reject all pending'}
            </Button>
          </S.ActionsRow>
        )}
      </S.SummarySection>

      {items.length === 0 ? (
        <S.EmptyMessage>No expenses</S.EmptyMessage>
      ) : (
        <S.ItemsList>
          {items.map((item) => (
            <S.ItemCard key={item.id}>
              <S.ItemInfo>
                <S.ItemName>{item.name}</S.ItemName>
                <S.ItemAmount>{formatAmount(item.amount)}</S.ItemAmount>
              </S.ItemInfo>
              <S.ItemActions>
                <S.StatusBadge status={item.status}>
                  {item.status.toUpperCase()}
                </S.StatusBadge>
                {item.status === 'PENDING' && (
                  <>
                    <Button
                      onClick={() => handleApproveItem(item.id)}
                      disabled={actionLoading === item.id}
                    >
                      {actionLoading === item.id ? 'Approving…' : 'Approve'}
                    </Button>
                    <Button
                      onClick={() => handleRejectItem(item.id)}
                      disabled={actionLoading === item.id}
                    >
                      {actionLoading === item.id ? 'Rejecting…' : 'Reject'}
                    </Button>
                  </>
                )}
              </S.ItemActions>
            </S.ItemCard>
          ))}
        </S.ItemsList>
      )}
    </S.Wrapper>
  );
}
