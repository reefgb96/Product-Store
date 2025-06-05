import React from 'react';

type ProductToolbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
  sortValue: string;
  onSortChange: (value: string) => void;
};

export const ProductToolbar: React.FC<ProductToolbarProps> = ({
  searchQuery,
  onSearchChange,
  onAdd,
  sortValue,
  onSortChange,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-start w-auto max-w-1/2 p-4 border-black gap-4">
      <AddBtn {...{ onAdd }} />
      <SearchBar {...{ onSearchChange }} {...{ searchQuery }} />
      <SortDropDown {...{ onSortChange }} {...{ sortValue }} />
    </div>
  );
};

type AddBtnProps = {
  onAdd: () => void;
};

const AddBtn: React.FC<AddBtnProps> = ({ onAdd }) => {
  return (
    <button
      onClick={onAdd}
      className="relative text-black bg-[#b4d6aa] border-4 border-black px-4 py-1 hover:border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 rounded-none"
    >
      + Add
    </button>
  );
};

type SearchBarProps = {
  onSearchChange: (value: string) => void;
  searchQuery: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, searchQuery }) => {
  return (
    <input
      type="text"
      placeholder="search products"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="px-2 py-1 bg-white border-4 border-black w-[180px]"
    />
  );
};

type SortDropDownProps = {
  sortValue: string;
  onSortChange: (value: string) => void;
};

const SortDropDown: React.FC<SortDropDownProps> = ({ sortValue, onSortChange }) => {
  return (
    <div className="flex items-center bg-transparent">
      <span className="mr-2 text-sm font-semibold">Sort by</span>
      <select
        value={sortValue}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-2 py-1 bg-white border-4 border-black"
      >
        <option className="border-4 border-black" value="name">
          Name
        </option>
        <option className="border-4 border-black" value="recent">
          Recently Added
        </option>
      </select>
    </div>
  );
};
