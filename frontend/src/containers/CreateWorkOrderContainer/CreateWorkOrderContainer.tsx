import "./CreateWorkOrderContainer.css";
import React from "react";
import { ICreateOrderFormData, IUser } from "../../typings";
import Button from "../../components/library/Button/Button";
import { useNavigate } from "react-router-dom";
import FormTextInput from "../../components/forms/FromTextInput/FormTextInput";
import AutoCompleteSelect from "../../components/forms/AutoCompleteSelect/AutoCompleteSelect";
import Modal from "../../components/library/Modal/Modal";
import handleFormInputChange from "../../utils/handleFormInputChange";
import useFetch from "../../hooks/useFetch";
import UserService from "../../services/user.service";
import workOrderService from "../../services/workOrder.service";

export default function CreateWorkOrderContainer() {
  const navigate = useNavigate();
  const { data: users } = useFetch<IUser[]>(() => UserService.list());
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<ICreateOrderFormData>({
    name: "",
    assigneeIds: [],
  });

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsLoading(true);

      const workOrderId = await workOrderService.create(formData);

      navigate(`/workorders/${workOrderId}`);
    } catch (e) {
      console.error(e);
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  }

  function isValid() {
    return formData.name.trim().length > 0;
  }

  return (
    <div className="create-work-order-container">
      {modalOpen && (
        <Modal message={"Failed to create work order please try again"} onClose={() => setModalOpen(false)} />
      )}
      <h2>Create Work Order</h2>
      <form className="create-work-order-container" onSubmit={handleCreate}>
        <FormTextInput
          autoFocus
          name="name"
          label="Name *"
          value={formData.name}
          onValueChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(handleFormInputChange(formData, e))}
        />
        <AutoCompleteSelect
          name="assigneeIds"
          label="Assignees"
          options={users?.map((user) => ({ label: user.name, value: String(user.id) }))}
          onValueChange={(assigneeIds: any[]) => setFormData({ ...formData, assigneeIds })}
        />
        <div className="button-row">
          <Button type="submit" disabled={!isValid() || isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
