import { IUser } from "../../../typings";
import WorkOrderAssignee from "../WorkOrderAssignee/WorkOrderAssignee";

interface WorkOrderAssigneesProps {
  users?: IUser[];
}

export default function WorkOrderAssignees({ users = [] }: WorkOrderAssigneesProps) {
  return (
    <p>
      <strong>Assignees:</strong>
      {users.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <WorkOrderAssignee user={user} />
            </li>
          ))}
        </ul>
      ) : (
        <em> None</em>
      )}
    </p>
  );
}
