import "./ProductivityContainer.css";
import Loading from "../../components/library/Loader/Loader";
import UserService from "../../services/user.service";
import Table from "../../components/library/Table/Table";
import useFetch from "../../hooks/useFetch";
import { IUser } from "../../typings";

export default function ProductivityContainer() {
  const { data: inactiveUsers, loading, error } = useFetch<IUser[]>(() => UserService.listInactive());

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>There was an error loading the data</div>;
  }

  return (
    <div>
      <h2>Productivity Report</h2>
      <p>Users not assigned to any open work orders</p>
      <Table data={inactiveUsers} emptyMessage="All users are assigned to workOrders" />
    </div>
  );
}
