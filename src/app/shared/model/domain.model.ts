export interface DomainEntity<T> {
  domain: T;
  requestStatus: RequestStatus;
}

export interface RequestStatus {
  status: Status;
  error?: {
    code?: number;
    errorMessage?: string;
  };
}

export enum Status {
  NEW = 'NEW',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
