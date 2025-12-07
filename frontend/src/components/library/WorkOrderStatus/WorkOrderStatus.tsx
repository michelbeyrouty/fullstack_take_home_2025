interface WorkOrderStatusProps {
  status?: string;
}

export default function WorkOrderStatus({ status = "Unknown" }: WorkOrderStatusProps) {
  return (
    <p>
      <strong>Status:</strong> {status}
    </p>
  );
}
