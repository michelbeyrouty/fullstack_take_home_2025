import "./WorkOrderAssignee.css";
import { IUser } from "../../../typings";

interface IProps {
  user: IUser;
}

export default function WorkOrderAssignee({ user }: IProps) {
  return (
    <span className="work-order-assignee">
      <span className="work-order-assignee-tooltip">{user.email}</span>
      {user.name}
    </span>
  );
}
