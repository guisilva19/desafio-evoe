import { Dispatch, SetStateAction, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import { Column, User } from "../interfaces";

import pencil from "../assets/svg/pencil.svg";
import link from "../assets/svg/link.svg";

const ITEMS_PER_PAGE = 10;

const generateMockData = (count: number): User[] => {
  const data: User[] = [];
  const names = ["Guilherme Silva", "Ane Caroline"];
  const values = [
    "2003silvagui@gmail.com",
    "2003silvagui@gmail.com",
    "2003silvagui@gmail.com",
  ];
  const telefones = ["77999577372", "77999577372", "77999577372"];

  for (let i = 1; i <= count; i++) {
    const date = new Date(2023, 0, 1);
    date.setDate(date.getDate() - i);

    data.push({
      id: i,
      name: names[i % names.length],
      email: values[i % values.length],
      telephone: telefones[i % telefones.length],
      link: "https://www.linkedin.com/in/guilhermesilvafernandes/",
    });
  }

  return data;
};

function Table({
  selectedRows,
  setSelectedRows,
  handleEdit,
}: {
  selectedRows: number[];
  setSelectedRows: Dispatch<SetStateAction<number[]>>;
  handleEdit: (user: User) => void;
}) {
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const mockData = generateMockData(25);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, mockData.length);
  const currentData = mockData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 mx-0.5 rounded ${
            currentPage === i
              ? "bg-gray-200 text-gray-700"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === currentData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData.map((item) => item.id));
    }
  };

  const toggleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleColumn = (key: keyof User) => {
    setColumns(
      columns.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const [columns, setColumns] = useState<Column[]>([
    { key: "name", label: "Name", visible: true },
    { key: "email", label: "Email", visible: true },
    { key: "telephone", label: "Telephone", visible: true },
    { key: "link", label: "Link", visible: true },
  ]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700">Users</h2>
          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => setShowColumnsDropdown(!showColumnsDropdown)}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm flex items-center gap-2 text-gray-700 hover:bg-gray-50"
              >
                All Columns
                <ChevronDown className="w-4 h-4" />
              </button>
              {showColumnsDropdown && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <div className="py-1">
                    {columns.map((column) => (
                      <label
                        key={column.key}
                        className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={column.visible}
                          onChange={() => toggleColumn(column.key)}
                          className="rounded border-gray-300 mr-2"
                        />
                        <span className="text-sm text-gray-700">
                          {column.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="px-3 py-1.5 border border-gray-300 rounded text-sm flex items-center gap-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setShowExportDropdown(!showExportDropdown)}
              >
                Export
                <ChevronDown className="w-4 h-4" />
              </button>
              {showExportDropdown && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <div className="py-1">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500">
                      Export selected PDF
                    </div>
                    <div className="px-3 py-2 text-xs text-gray-500">
                      Export all selected Excel
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === currentData.length}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                {columns
                  .filter((col) => col.visible)
                  .map((column) => (
                    <th
                      key={column.key}
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500"
                    >
                      {column.label}
                    </th>
                  ))}
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => toggleSelectRow(item.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  {columns
                    .filter((col) => col.visible)
                    .map((column) => (
                      <td
                        key={column.key}
                        className="px-4 py-2 text-sm text-gray-900"
                      >
                        {column.key === "link" ? (
                          <a
                            href={item[column.key]}
                            target="_blank"
                            className="flex items-center gap-2 hover:underline"
                            title={item[column.key]}
                          >
                            <img
                              src={link}
                              alt="Link"
                              className="w-4 h-4 text-gray-600"
                            />
                            <span>
                              {item[column.key].length > 20
                                ? `${item[column.key].substring(0, 20)}...`
                                : item[column.key]}
                            </span>
                          </a>
                        ) : (
                          item[column.key]
                        )}
                      </td>
                    ))}
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <img src={pencil} alt="Pencil" className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION OF USERS*/}
      <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-center">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`p-1 rounded ${
              currentPage === 1
                ? "text-gray-300"
                : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {renderPageNumbers()}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className={`p-1 rounded ${
              currentPage === totalPages
                ? "text-gray-300"
                : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
export default Table;
