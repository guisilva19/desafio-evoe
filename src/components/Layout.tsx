import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import coracao from "../assets/coracao.png";

function Layout() {
  return (
    <div>
      <header className="flex items-center w-screen h-20 bg-white px-10">
        <div className="cursor-pointer flex justify-center items-center group relative h-max">
          <img
            src={logo}
            alt="Evoé"
            className="w-28 transition-transform duration-300 ease-in-out"
          />
          <img
            src={coracao}
            alt="Coração"
            className="w-6 absolute bottom-0 transition-transform duration-300 ease-in-out transform translate-y-0 opacity-0 group-hover:translate-y-[-28px] group-hover:opacity-100"
          />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
