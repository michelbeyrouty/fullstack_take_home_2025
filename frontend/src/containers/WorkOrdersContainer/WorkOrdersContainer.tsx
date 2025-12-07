import "./WorkOrdersContainer.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../../components/library/Loader/Loader";
import { IWorkOrder } from "../../typings";
import Table from "../../components/library/Table/Table";
import useFetch from "../../hooks/useFetch";
import WorkOrderService from "../../services/workOrder.service";
import FormTextInput from "../../components/forms/FromTextInput/FormTextInput";

export default function WorkOrderList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: workOrders, loading, error } = useFetch<IWorkOrder[]>(() => WorkOrderService.list());

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  function filterWorkOrders(searchTerm: string, workOrders: IWorkOrder[] = []): IWorkOrder[] {
    return workOrders.filter((workOrder) => workOrder.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Work Orders</h2>
      <div className="work-orders-search-bar">
        <p>All work orders (OPEN orders shown first)</p>
        <FormTextInput
          name="search"
          value={searchTerm}
          onValueChange={handleSearchChange}
          placeholder="Search work orders by name..."
        />
      </div>
      <Table
        data={filterWorkOrders(searchTerm, workOrders)}
        onRowClick={(item) => navigate(`/workorders/${item.id}`)}
        emptyMessage={searchTerm ? "No work orders match your search" : "There are currently no work orders"}
      />
    </div>
  );
}
