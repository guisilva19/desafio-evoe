import { useState } from "react";
import link from "../../assets/svg/link.svg";
import search from "../../assets/svg/search.svg";
import calendar from "../../assets/svg/calendar.svg";
import trash from "../../assets/svg/trash-white.svg";
import pencil from "../../assets/svg/pencil.svg";
import close from "../../assets/svg/close.svg";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  telephone: string;
  link: string;
}

interface FilterOption {
  id: string;
  label: string;
}

interface Column {
  key: keyof User;
  label: string;
  visible: boolean;
}

const filterOptions: FilterOption[] = [
  { id: "filter1", label: "Filter name" },
  { id: "filter2", label: "Filter name" },
  { id: "filter3", label: "Filter name" },
  { id: "filter4", label: "Filter name" },
  { id: "filter5", label: "Filter name" },
  { id: "filter6", label: "Filter name" },
  { id: "filter7", label: "Filter name" },
  { id: "filter8", label: "Filter name" },
  { id: "filter9", label: "Filter name" },
];

// Generate more mock data
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

const ITEMS_PER_PAGE = 10;

function Home() {
  const mockData = generateMockData(25);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [columns, setColumns] = useState<Column[]>([
    { key: "name", label: "Name", visible: true },
    { key: "email", label: "Email", visible: true },
    { key: "telephone", label: "Telephone", visible: true },
    { key: "link", label: "Link", visible: true },
  ]);

  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, mockData.length);
  const currentData = mockData.slice(startIndex, endIndex);

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

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setSelectedRows([]);
    setShowDeleteModal(false);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <img
                    src={search}
                    alt="Search"
                    className="w-4 h-4 text-gray-400"
                  />
                </button>
              </div>
            </div>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2">
              <img src={calendar} alt="Calendar" className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2"
            >
              More filters
              {showMoreFilters ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            <button className="px-6 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
              Search
            </button>
          </div>
          {showMoreFilters && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {filterOptions.map((filter) => (
                <label
                  key={filter.id}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.has(filter.id)}
                    onChange={() => {
                      const newFilters = new Set(selectedFilters);
                      if (newFilters.has(filter.id)) {
                        newFilters.delete(filter.id);
                      } else {
                        newFilters.add(filter.id);
                      }
                      setSelectedFilters(newFilters);
                    }}
                    className="rounded border-gray-300"
                  />
                  {filter.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

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

        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
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
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {endIndex} of {mockData.length} entries
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-end justify-end p-4">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 mr-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Delete {selectedRows.length === 1 ? "User" : "Users"}
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <img src={close} alt="Close" className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete{" "}
              {selectedRows.length === 1
                ? "this user"
                : `${selectedRows.length} users`}
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit User</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <img src={close} alt="Close" className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {Object.entries(editingUser).map(
                ([key, value]) =>
                  key !== "id" && (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          setEditingUser({
                            ...editingUser,
                            [key]: e.target.value,
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                      />
                    </div>
                  )
              )}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Implement save logic here
                  setShowEditModal(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {selectedRows.length > 0 && !showDeleteModal && !showEditModal && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {selectedRows.length} {selectedRows.length === 1 ? "user" : "users"}{" "}
            selected
          </span>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md flex items-center gap-2"
          >
            <img src={trash} alt="Trash" className="w-4 h-4 text-white" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
