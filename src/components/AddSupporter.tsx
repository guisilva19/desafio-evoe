import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../context/AuthContext";
import { SupporterAdd } from "../interfaces";
import { schemaAddSupporter } from "../utils/schemas";

import close from "../assets/svg/close.svg";
import toast from "react-hot-toast";

function AddSupporter({
  closeModal,
  closeModalWithAdd,
}: {
  closeModal: () => void;
  closeModalWithAdd: () => void;
}) {
  const { addSupporter } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schemaAddSupporter),
  });

  const onSubmit = async (newSupporter: SupporterAdd) => {
    try {
      setIsLoading(true);
      await addSupporter(newSupporter);
      toast.success("Apoiador adicionado com sucesso");
      closeModalWithAdd();
    } catch (error) {
      toast.error("Não foi possível adicionar o apoiador");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Adicionar Apoiador
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-500"
          >
            <img src={close} alt="Fechar" className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {["email", "nome", "link", "telefone"].map((field: any) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                {...register(field)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              />

              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">
                  {typeof errors[field]?.message === "string"
                    ? errors[field]?.message
                    : "Erro desconhecido"}
                </p>
              )}
            </div>
          ))}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="custom-button px-4 cursor-pointer"
            >
              {isLoading ? "Adicionando..." : "Adicionar Apoiador"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSupporter;
