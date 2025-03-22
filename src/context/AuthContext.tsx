import { createContext, useState, useEffect, ReactNode } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  nome: string;
  email: string;
  link: string;
  telefone: string;
}

interface AuthContextType {
  user: User | null;
  access_token: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
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

  return (
    <AuthContext.Provider
      value={{ user, login, logout, access_token: cookies.access_token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
