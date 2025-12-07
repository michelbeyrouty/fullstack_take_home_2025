import "./Table.css";

interface TableProps<T> {
  data?: T[];
  onRowClick?: (item: T, index: number) => void;
  emptyMessage?: string;
}

export default function Table<T extends Record<string, any>>({
  data = [],
  onRowClick,
  emptyMessage = "No data available",
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="table-container">
        <div className="table-empty">{emptyMessage}</div>
      </div>
    );
  }

  const tableHeaders = Object.keys(data[0]);

  return (
    <div className="table-container">
      <table className="generic-table">
        <thead>
          <tr>
            {tableHeaders.map((tableHeader) => (
              <th key={`col-${tableHeader}`} className="table-header">
                {tableHeader}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr
                key={`row-${index}`}
                className={`table-row ${onRowClick ? "clickable" : ""}`}
                onClick={() => onRowClick?.(item, index)}
              >
                {tableHeaders.map((key) => (
                  <td key={key} className="table-cell">
                    {String(item[key])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
