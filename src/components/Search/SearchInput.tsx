import { ChangeEvent } from "react";
import { SearchIcon } from "../Icons/SearchIcon";

export const SearchInput = ({ disabled=false, textValue='', onChange = (e:ChangeEvent<HTMLInputElement>) => {}, search = () => {} }) => {
  
  
  return (
    <div className="flex w-full bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      {/* Input de búsqueda */}
      <input
        disabled={disabled}
        value={textValue}
        onChange={onChange}
        type="text"
        className="block w-full pl-2 pr-4 py-3 text-sm text-gray-700 border-none focus:border-none focus:outline-none"
        placeholder="Buscar..."
        onKeyUp={(e: any) => {
          var keycode = (e.keyCode ? e.keyCode : e.which);
          if (keycode == '13') {
              search();
              e.preventDefault();
              return false;
          
        }}}
      />
      {/* Icono de lupa */}
      <button disabled={disabled} onClick={search}  className="border-0 cursor-pointer inset-y-0 right-0 flex items-center pr-3">
         <SearchIcon />  
      </button>
    </div>
  );
};