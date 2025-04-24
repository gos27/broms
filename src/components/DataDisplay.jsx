import React, { useState, useMemo } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const DataDisplay = ({ data = [], keys = [], onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      keys.some((key) =>
        String(item[key] ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      ),
    );
  }, [data, keys, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <section className="container mx-auto px-4 py-6">
      {/* Search and Items Per Page */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-1/3"
        />

        <div className="flex items-center gap-2">
          <label htmlFor="itemsPerPage" className="font-medium text-gray-700">
            Show:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="rounded border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[4, 6, 8, 10].map((num) => (
              <option key={num} value={num}>
                {num} per page
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Cards */}
      {paginatedData.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedData.map((item) => (
            <div
              key={item.id || `${item.name}-${item.subject}-${item.score}`}
              className="rounded-2xl bg-white p-4 shadow-md transition-shadow hover:shadow-xl"
            >
              {keys.map((key) => {
                const value = item[key];

                let displayValue = "N/A";
                if (Array.isArray(value)) {
                  displayValue = value.length > 0 ? value.join(", ") : "N/A";
                } else if (value || value === 0) {
                  displayValue = value;
                }

                return (
                  <p key={key} className="mb-1 text-gray-700">
                    <span className="font-semibold">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </span>
                    {displayValue}
                  </p>
                );
              })}

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => onEdit(item)}
                  className="flex cursor-pointer items-center gap-1 rounded-lg bg-blue-600 px-4 py-1.5 text-white transition duration-300 hover:bg-blue-700"
                >
                  <FiEdit className="text-lg" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="flex cursor-pointer items-center gap-1 rounded-lg bg-red-600 px-4 py-1.5 text-white transition duration-300 hover:bg-red-700"
                >
                  <FiTrash2 className="text-lg" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center text-lg font-medium text-gray-500">
          🚫 No matching results found.
        </div>
      )}

      {/* Pagination */}
      {filteredData.length > itemsPerPage && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default DataDisplay;
