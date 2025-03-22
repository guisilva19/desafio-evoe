import { Outlet } from "react-router-dom";
import { LogOut } from "lucide-react";

import logo from "../assets/logo.png";
import coracao from "../assets/coracao.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Layout() {
  const { logout, user } = useContext(AuthContext);

  return (
    <div>
      <header className="flex items-center justify-between w-screen h-16 bg-white pl-10 pr-16">
        <div className="cursor-pointer flex justify-center items-center group relative h-max">
          <img
            src={logo}
            alt="Evoé"
            className="w-24 transition-transform duration-300 ease-in-out"
          />
          <img
            src={coracao}
            alt="Coração"
            className="w-5 absolute bottom-0 transition-transform duration-300 ease-in-out transform translate-y-0 opacity-0 group-hover:translate-y-[-22px] group-hover:opacity-100"
          />
        </div>

        <div className="flex gap-5">
          <img
            src={`https://api.dicebear.com/7.x/initials/png?seed=${user?.nome}`}
            alt="Avatar"
            className="rounded-full w-10 h-10 cursor-pointer"
          />
          <button
            onClick={logout}
            className="cursor-pointer hover:bg-gray-300 rounded-full w-10 h-10 flex justify-center items-center"
          >
            <LogOut />
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
