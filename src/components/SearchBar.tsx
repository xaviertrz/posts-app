import React, { Dispatch, SetStateAction } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

function SearchBar({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="relative mb-6 max-w-sm items-center flex">
      <Search className="absolute left-3 top-3 text-gray-400" size={18} />
      <Input
        type="text"
        placeholder="Buscar usuario..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}

export default SearchBar;
