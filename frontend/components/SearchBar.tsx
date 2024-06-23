import { BsSearch } from "react-icons/bs";

type props = {
  search: string;
  setSearch: (string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  enter?: () => void;
};

export function SearchBar(props: props) {
  return (
    <div className="mb-3 flex flex-row items-center gap-2 px-4 rounded-3xl border bg-white mt-6">
      <input
        type="search"
        name="search"
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
        placeholder="Buscar"
        onKeyDown={(e) => {
          e.key == "Enter" ? props.enter() : "";
        }}
        className="w-full bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
      />
      <BsSearch>Search</BsSearch>
    </div>
  );
}
