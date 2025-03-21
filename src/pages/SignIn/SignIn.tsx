import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import coracao from "../../assets/coracao.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSignIn } from "../../utils/schemas";

function SignIn() {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignIn),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    const response = await login(data.email, data.password);

    if (response) {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-white relative">
      <div className="absolute top-30 left-1/2 transform -translate-x-1/2 cursor-pointer flex justify-center items-center group">
        <img
          src={logo}
          alt="Evoé"
          className="w-36 transition-transform duration-300 ease-in-out"
        />
        <img
          src={coracao}
          alt="Coração"
          className="w-10 absolute bottom-0 transition-transform duration-300 ease-in-out transform translate-y-0 opacity-0 group-hover:translate-y-[-35px] group-hover:opacity-100"
        />
      </div>

      <div className="relative z-10 max-w-md w-full flex px-5 bg-white shadow-xl p-8 rounded-3xl justify-center">
        <div className="perspective">
          <div className="transform-3d animate-fade-up">
            <div className="glass-morphism backdrop-blur-md w-full max-w-md mx-auto">
              <div className="space-y-6 stagger-animation">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Bem-vindo
                  </h1>
                  <p className="text-sm text-gray-500 text-balance">
                    Entre com seus dados para acessar sua conta
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      E-mail
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="seu@email.com"
                        {...register("email")}
                        className="custom-input"
                      />
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email?.message}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Senha
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        {...register("password")}
                        className="custom-input"
                      />
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password?.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button type="submit" className="custom-button mx-auto">
                      Entrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
