import React, { useState } from "react";
import { usePlanillas } from "../../services/queries";

export const PlanillasList: React.FC = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading, isError, error } = usePlanillas(page, pageSize);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Planillas</h1>
      <ul>
        {data.data.map((planilla) => (
          <li key={planilla._id}>{/* Render planilla details here */}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {data.totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
          disabled={page === data.totalPages}
        >
          Next
        </button>
      </div>
      <div>Total items: {data.totalCount}</div>
    </div>
  );
};
