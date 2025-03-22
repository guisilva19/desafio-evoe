import close from "../assets/svg/close.svg";

function DeletarUsuario({
  selectedRows,
  closeModal,
}: {
  selectedRows: string[];
  closeModal: () => void;
}) {
  const handleDelete = () => {};

  return (
    <>
      <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-end justify-end p-4">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6 mr-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Deletar {selectedRows.length === 1 ? "Usuário" : "Usuários"}
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-500"
            >
              <img src={close} alt="Fechar" className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Tem certeza de que deseja deletar{" "}
            {selectedRows.length === 1
              ? "este usuário"
              : `${selectedRows.length} usuários`}
            ? Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
            >
              Deletar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeletarUsuario;
