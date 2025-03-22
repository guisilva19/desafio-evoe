import { Dispatch, SetStateAction } from "react";
import { Supporter } from "../interfaces";
import close from "../assets/svg/close.svg";

function EditarUsuario({
  closeModal,
  editingUser,
  setEditingUser,
}: {
  closeModal: () => void;
  editingUser: Supporter;
  setEditingUser: Dispatch<SetStateAction<Supporter | null>>;
}) {
  return (
    <>
      <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Editar Usuário
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-500"
            >
              <img src={close} alt="Fechar" className="w-5 h-5" />
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
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditarUsuario;
