import React from 'react';
import { IssuanceMaster } from './IssuanceMaster';

interface IssuanceOperationsProps {
  initialClaimId?: string | null;
}

export function IssuanceOperations({ initialClaimId }: IssuanceOperationsProps) {
  return <IssuanceMaster initialClaimId={initialClaimId} />;
}
