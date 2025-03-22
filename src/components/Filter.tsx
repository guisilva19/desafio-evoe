import { Dispatch, SetStateAction, useState } from "react";
import { ChevronsDown, ChevronsUp } from "lucide-react";

import { FilterOption } from "../interfaces";
import calendarIcon from "../assets/svg/calendar.svg";
import searchIcon from "../assets/svg/search.svg";

const filterOptions: FilterOption[] = [
  { id: "1", label: "Name" },
  { id: "2", label: "Email" },
  { id: "3", label: "Telefone" },
];

function Filter({
  search,
  setSearch,
  isNome,
  isEmail,
  isTelefone,
  setIsNome,
  setIsEmail,
  setIsTelefone,
  handleSearch,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;

  isNome: boolean;
  isEmail: boolean;
  isTelefone: boolean;
  setIsNome: Dispatch<SetStateAction<boolean>>;
  setIsEmail: Dispatch<SetStateAction<boolean>>;
  setIsTelefone: Dispatch<SetStateAction<boolean>>;

  handleSearch: () => void;
}) {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const handleFilterChange = (filterId: string) => {
    switch (filterId) {
      case "1":
        setIsNome(!isNome);
        if (!isNome) {
          setIsEmail(false);
          setIsTelefone(false);
        }
        break;
      case "2":
        setIsEmail(!isEmail);
        if (!isEmail) {
          setIsNome(false);
          setIsTelefone(false);
        }
        break;
      case "3":
        setIsTelefone(!isTelefone);
        if (!isTelefone) {
          setIsNome(false);
          setIsEmail(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <img
                    src={searchIcon}
                    alt="Buscar"
                    className="w-4 h-4 text-gray-400"
                  />
                </button>
              </div>
            </div>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 cursor-pointer">
              <img src={calendarIcon} alt="Calendário" className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm flex items-center justify-between gap-2 font-bold w-40"
            >
              Mais filtros
              {showMoreFilters ? (
                <ChevronsUp className="w-4 h-4" />
              ) : (
                <ChevronsDown className="w-4 h-4" />
              )}
            </button>
            <button
              className="custom-button w-40 text-sm"
              onClick={handleSearch}
            >
              Buscar
            </button>
          </div>
          {showMoreFilters && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {filterOptions.map((filter) => (
                <label
                  key={filter.id}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={
                      (filter.id === "1" && isNome) ||
                      (filter.id === "2" && isEmail) ||
                      (filter.id === "3" && isTelefone)
                    }
                    onChange={() => handleFilterChange(filter.id)}
                    className="rounded border-gray-300"
                  />
                  {filter.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Filter;
