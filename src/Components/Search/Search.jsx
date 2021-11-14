import { useState } from "react";

const Search = ({ onSearch = () => {} }) => {
  const [name, setName] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSearch(name);
  }
  
  return (
    <form onSubmit={onSubmitHandler}>
      <input className="border-2 border-blue-400 rounded-full mr-2 pl-2" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
      <button className="hover:bg-gray-200 border-blue-400 border-2 rounded-full ml-2 w-20" type="submit"> Buscar </button>
    </form>
  );
}

export default Search;