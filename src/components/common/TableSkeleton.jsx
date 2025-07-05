import styles from "@/styles/TableSkeleton.module.css";

const TableSkeleton = ({ rows = 10, columns = 5 }) => {
  return (
    <table className="min-w-full border border-gray-700 overflow-x-auto">
      <thead>
        <tr>
          {Array.from({ length: columns }).map((_, colIdx) => (
            <th
              key={colIdx}
              className="p-3 border-b border-gray-700 bg-gray-800 h-4"
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <tr key={rowIdx}>
            {Array.from({ length: columns }).map((_, colIdx) => (
              <td
                key={colIdx}
                className="p-3 border-b border-gray-700 bg-gray-900 h-5 rounded"
              >
                <div
                  className={`bg-gray-700 h-4 w-full rounded ${styles.pulse}`}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
