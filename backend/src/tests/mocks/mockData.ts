import { IWorkOrder, WorkOrderStatus, IUser } from "../../typings";

export const mockWorkOrder: IWorkOrder = {
  id: 0,
  name: "",
  status: WorkOrderStatus.OPEN,
  assignees: [],
};

export const mockWorkOrderWithData: IWorkOrder = {
  id: 1,
  name: "Test Work Order",
  status: WorkOrderStatus.OPEN,
  assignees: [],
};

export const mockClosedWorkOrder: IWorkOrder = {
  id: 2,
  name: "Closed Work Order",
  status: WorkOrderStatus.CLOSED,
  assignees: [],
};

export const mockWorkOrders: IWorkOrder[] = [mockWorkOrderWithData, mockClosedWorkOrder];

export const mockUsers: IUser[] = [
  { id: 1, name: "Alien Morty", email: "alien@mortys.com" },
  { id: 2, name: "Banana Morty", email: "slippery@mortys.com" },
];

export const mockUser: IUser = { id: 1, name: "Alien Morty", email: "alien@mortys.com" };
