import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Supporter } from "../interfaces";

import { AuthContext } from "../context/AuthContext";

import close from "../assets/svg/close.svg";
import toast from "react-hot-toast";

function EditSupporter({
  closeModal,
  closeModalWithUpdate,
  editingSupporter,
  setEditingSupporter,
}: {
  closeModal: () => void;
  closeModalWithUpdate: () => void;
  editingSupporter: Supporter;
  setEditingSupporter: Dispatch<SetStateAction<Supporter | null>>;
}) {
  const { updateSupporter } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updateSupporter(editingSupporter.id, editingSupporter);
      toast.success("Apoiador atualizado com sucesso");
    } catch (error) {
      toast.error("Não foi possivel atualizar");
    } finally {
      setIsLoading(true);
    }
    closeModalWithUpdate();
  };

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
            {Object.entries(editingSupporter).map(([key, value]) => {
              if (key === "id") return null;

              const isEmailField = key === "email";

              return (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      if (!isEmailField) {
                        setEditingSupporter({
                          ...editingSupporter,
                          [key]: e.target.value,
                        });
                      }
                    }}
                    disabled={isEmailField}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black ${
                      isEmailField
                        ? "bg-gray-100 border-gray-400"
                        : "border-gray-300"
                    }`}
                  />
                  {isEmailField && (
                    <p className="text-sm text-gray-500 mt-1">
                      Este campo não pode ser alterado
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md cursor-pointer"
            >
              Cancelar
            </button>
            <button
              disabled={isLoading}
              onClick={handleSave}
              className="custom-button px-4 cursor-pointer"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditSupporter;
