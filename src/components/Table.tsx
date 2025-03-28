import { useContext, useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { Column, ResponseData, Supporter } from "../interfaces";
import { SyncLoader } from "react-spinners";

import { AuthContext } from "../context/AuthContext";

import Pagination from "./Pagination";
import Filter from "./Filter";

import pencil from "../assets/svg/pencil.svg";
import link from "../assets/svg/link.svg";
import trash from "../assets/svg/trash-white.svg";
import EditSupporter from "./EditSupporter";
import DeleteSupporter from "./DeleteSupporter";
import AddSupporter from "./AddSupporter";

function Table() {
  const [data, setData] = useState<ResponseData>({} as ResponseData);

  const { getSupporters } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingSupporter, setEditingSupporter] = useState<Supporter | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [search, setSearch] = useState("");

  const [isNome, setIsNome] = useState(true);
  const [isEmail, setIsEmail] = useState(false);
  const [isTelefone, setIsTelefone] = useState(false);

  useEffect(() => {
    get();
  }, [currentPage]);

  const get = async () => {
    try {
      setIsLoading(true);
      const response = await getSupporters(
        currentPage,
        search,
        isNome,
        isEmail,
        isTelefone
      );
      setData(response);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === data.supporters.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.supporters.map((item) => item.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleColumn = (key: keyof Supporter) => {
    setColumns(
      columns.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const [columns, setColumns] = useState<Column[]>([
    { key: "nome", label: "Nome", visible: true },
    { key: "email", label: "E-mail", visible: true },
    { key: "telefone", label: "Telefone", visible: true },
    { key: "link", label: "Link", visible: true },
  ]);

  const handleEdit = (supporter: Supporter) => {
    setEditingSupporter(supporter);
    setShowEditModal(true);
  };

  return (
    <>
      {/* FILTRO PARA TABELA  */}
      <Filter
        search={search}
        setSearch={setSearch}
        isNome={isNome}
        isEmail={isEmail}
        isTelefone={isTelefone}
        setIsNome={setIsNome}
        setIsEmail={setIsEmail}
        setIsTelefone={setIsTelefone}
        handleSearch={get}
      />
      {isLoading ? (
        <div className="w-full flex justify-center items-center h-40">
          <SyncLoader color="#000" size={10} />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-700">Usuários</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    onClick={() => setShowColumnsDropdown(!showColumnsDropdown)}
                    className="px-3 py-1.5 border border-gray-300 rounded text-sm flex items-center gap-2 text-gray-700 hover:bg-gray-50"
                  >
                    Todas as Colunas
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
                    Exportar
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showExportDropdown && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                      <div className="py-1">
                        <div className="px-3 py-2 text-xs font-medium text-gray-500">
                          Exportar selecionados para PDF
                        </div>
                        <div className="px-3 py-2 text-xs text-gray-500">
                          Exportar todos para Excel
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="custom-button h-full px-2"
                  >
                    <Plus />
                  </button>
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
                        checked={
                          selectedRows.length === data.supporters?.length
                        }
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
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.supporters?.map((item) => (
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
                          <img src={pencil} alt="Editar" className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PAGINAÇÃO DOS USUÁRIOS */}
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-center">
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.max(1, prev - 1));
                  setSelectedRows([]);
                }}
                disabled={currentPage === 1}
                className={`p-1 rounded ${
                  currentPage === 1
                    ? "text-gray-300"
                    : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={data.totalPages}
                setSelectedRows={setSelectedRows}
              />
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.min(data.totalPages, prev + 1));
                  setSelectedRows([]);
                }}
                disabled={currentPage === data.totalPages}
                className={`p-1 rounded ${
                  currentPage === data.totalPages
                    ? "text-gray-300"
                    : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* MODAL ADICIONAR APOIADOR */}
      {showAddModal && (
        <AddSupporter
          closeModal={() => setShowAddModal(false)}
          closeModalWithAdd={() => {
            setShowAddModal(false);
            get();
          }}
        />
      )}

      {/* MODAL EDITAR APOIADOR */}
      {showEditModal && editingSupporter && (
        <EditSupporter
          closeModal={() => setShowEditModal(false)}
          editingSupporter={editingSupporter}
          setEditingSupporter={setEditingSupporter}
          closeModalWithUpdate={async () => {
            setShowEditModal(false);
            await get();
          }}
        />
      )}

      {/* MODAL PARA CONTAGEM DE APOIADORES */}
      {selectedRows.length > 0 && !showDeleteModal && !showEditModal && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {selectedRows.length}{" "}
            {selectedRows.length === 1 ? "apoiador" : "apoiadores"} selecionado
          </span>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md flex items-center gap-2"
          >
            <img src={trash} alt="Trash" className="w-4 h-4 text-white" />
            Remover
          </button>
        </div>
      )}

      {/* MODAL CONFIRMAR DELEÇÃO DOS APOIADORES */}
      {showDeleteModal && (
        <DeleteSupporter
          closeModal={() => setShowDeleteModal(false)}
          selectedRows={selectedRows}
          closeModalWithUpdate={async () => {
            setShowDeleteModal(false);
            setSelectedRows([]);
            await get();
          }}
        />
      )}
    </>
  );
}

export default Table;
