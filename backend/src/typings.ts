export interface IUser {
  id: number;
  name: string;
  email: string;
}

// This generates runtime values, thus this file can't be .d.ts.
export enum WorkOrderStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export interface IWorkOrder {
  id: number;
  name: string;
  status: WorkOrderStatus;
  assignees: IUser[];
}
