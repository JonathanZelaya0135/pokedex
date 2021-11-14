import { useState } from "react";

function Pages({OnPage}){
    const [pageDirection, setPageDirection] = useState(0)
      

      return (
        <div>
          <button className="hover:bg-gray-200 border-2 border-blue-400 rounded-full mr-2 w-16 pl-2 pr-2" type="prev" onClick={()=> {setPageDirection(pageDirection-20)}}> Atras </button>
          <button className="hover:bg-gray-200 border-blue-400 border-2 rounded-full ml-2 w-24 pl-2 pr-2" type="next" onClick={()=> {setPageDirection(pageDirection+20)}}> Adelante </button>
        </div>
      );

}

export default Pages;