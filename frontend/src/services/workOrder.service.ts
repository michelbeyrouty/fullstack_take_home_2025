import { ICreateOrderFormData, IWorkOrder } from "../typings";
import fetchApi from "../utils/fetchApi";

class WorkOrderService {
  async list(): Promise<IWorkOrder[]> {
    const { workOrders } = await fetchApi({ endpoint: "/workorders" });

    return workOrders;
  }

  async get(workOrderId?: string): Promise<IWorkOrder> {
    const { workOrder } = await fetchApi({ endpoint: `/workorders/${workOrderId}` });

    return workOrder;
  }

  async delete(workOrderId?: string): Promise<void> {
    await fetchApi({ endpoint: `/workorders/${workOrderId}`, method: "DELETE" });
  }

  async create(data: ICreateOrderFormData): Promise<string> {
    const { id } = await fetchApi({
      endpoint: `/workorders`,
      method: "POST",
      data,
    });

    return id;
  }
}

export default new WorkOrderService();
