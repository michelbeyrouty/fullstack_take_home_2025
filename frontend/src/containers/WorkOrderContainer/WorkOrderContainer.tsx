import "./WorkOrderContainer.css";
import React from "react";
import fetchApi from "../../utils/fetchApi";
import Button from "../../components/library/Button/Button";
import Loading from "../../components/library/Loader/Loader";
import WorkOrderAssignees from "../../components/library/WorkOrderAssignees/WorkOrderAssignees";
import WorkOrderStatus from "../../components/library/WorkOrderStatus/WorkOrderStatus";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/library/Modal/Modal";
import workOrderService from "../../services/workOrder.service";
import useFetch from "../../hooks/useFetch";
import { IWorkOrder } from "../../typings";

export default function WorkOrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{
    id: string;
  }>();

  const { data: workOrder, loading, error } = useFetch<IWorkOrder>(() => workOrderService.get(id));
  const [modalOpen, setModalOpen] = React.useState(false);

  async function handleStatusUpdate() {
    try {
      await fetchApi({
        endpoint: `/workorders/${id}/status`,
        method: "PUT",
      });

      globalThis.location.reload();
    } catch (e) {
      console.error(e);
      setModalOpen(true);
    }
  }

  async function handleDelete() {
    try {
      await workOrderService.delete(id);
      navigate("/workorders");
    } catch (e) {
      console.error(e);
      setModalOpen(true);
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (error || !workOrder) {
    navigate("/workorders");
  }

  return (
    <div className="work-order-details">
      {modalOpen && <Modal message={"Failed to update status please try again"} onClose={() => setModalOpen(false)} />}
      <h2>{workOrder?.name}</h2>
      <WorkOrderStatus status={workOrder?.status} />
      <WorkOrderAssignees users={workOrder?.assignees} />
      <div className="button-row">
        <Button onClick={handleStatusUpdate}>{workOrder?.status === "OPEN" ? "Close" : "Open"}</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
}
