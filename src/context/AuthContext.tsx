import { createContext, useState, useEffect, ReactNode } from "react";
import { useCookies } from "react-cookie";
import { ResponseData, User } from "../interfaces";
import axios from "axios";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  access_token: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  getSupporters: (
    page: number,
    search?: string,
    isNome?: boolean,
    isEmail?: boolean,
    isTelefone?: boolean
  ) => Promise<ResponseData>;
  deleteSupporters: (ids: string[]) => Promise<boolean>;
  updateSupporter: (id: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const apiUrl = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get(apiUrl + "/users/me", {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        });
        setUser(response.data);
      } catch {
        setUser(null);
      }
    };

    checkUser();
  }, [cookies.access_token]);

  const login = async (email: string, senha: string) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth`,
        { email, senha },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status) {
        toast.success("Login feito com sucesso.");
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 24);
        setCookie("access_token", response.data.access_token, {
          expires: expirationDate,
        });
        return true;
      }
      return false;
    } catch {
      toast.error("Usuário ou senha inválidos. Tente novamente.");
      return false;
    }
  };

  const logout = async () => {
    removeCookie("access_token");
    setUser(null);
  };

  const getSupporters = async (
    page: number,
    search: string = "",
    isNome: boolean = false,
    isEmail: boolean = false,
    isTelefone: boolean = false
  ): Promise<ResponseData> => {
    const queryParams: Record<string, string> = {
      page: page.toString(),
    };

    if (isNome) {
      queryParams["nome"] = search;
    }
    if (isEmail) {
      queryParams["email"] = search;
    }
    if (isTelefone) {
      queryParams["telefone"] = search;
    }

    const queryString = new URLSearchParams(queryParams).toString();

    try {
      const response = await axios.get(`${apiUrl}/supporters?${queryString}`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Erro ao obter apoiadores:", error);
      throw error;
    }
  };

  const updateSupporter = async (id: string) => {
    return true;
  };

  const deleteSupporters = async (ids: string[]) => {
    try {
      const deletePromises = ids.map((id) =>
        axios.delete(`${apiUrl}/supporters/${id}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        })
      );

      await Promise.all(deletePromises);

      return true;
    } catch (error) {
      console.error("Erro ao excluir apoiadores:", error);

      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        getSupporters,
        updateSupporter,
        deleteSupporters,
        access_token: cookies.access_token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
