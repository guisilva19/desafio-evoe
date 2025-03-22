import { useState } from "react";
import { ChevronsDown, ChevronsUp } from "lucide-react";

import { FilterOption } from "../interfaces";

import search from "../assets/svg/search.svg";
import calendar from "../assets/svg/calendar.svg";

const filterOptions: FilterOption[] = [
  { id: "1", label: "Name" },
  { id: "2", label: "Email" },
  { id: "3", label: "Telefone" },
];

function Filter() {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <img
                    src={search}
                    alt="Search"
                    className="w-4 h-4 text-gray-400"
                  />
                </button>
              </div>
            </div>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 cursor-pointer">
              <img src={calendar} alt="Calendar" className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm flex items-center justify-between gap-2 font-bold w-40"
            >
              More filters
              {showMoreFilters ? (
                <ChevronsUp className="w-4 h-4" />
              ) : (
                <ChevronsDown className="w-4 h-4" />
              )}
            </button>
            <button className="custom-button w-40 text-sm">Search</button>
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
                    checked={selectedFilters.has(filter.id)}
                    onChange={() => {
                      const newFilters = new Set(selectedFilters);
                      if (newFilters.has(filter.id)) {
                        newFilters.delete(filter.id);
                      } else {
                        newFilters.add(filter.id);
                      }
                      setSelectedFilters(newFilters);
                    }}
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
