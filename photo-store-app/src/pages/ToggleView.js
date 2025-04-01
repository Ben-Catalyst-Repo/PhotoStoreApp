// import { FiGrid, FiList } from "react-icons/fi"; 
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";


// export default function ToggleView() {
//     const [isListView, setIsListView] = useState(false);
//     const navigate = useNavigate();

//     const handleToggle = () => {
//         // const newPath = isListView ? "#/" : "#/list";
//         // window.location.href = newPath;
//         isListView ? navigate("/") : navigate("/list");
//         setIsListView(!isListView);
//     };

//     return (
//             <button onClick={handleToggle} 
//                 className="bg-blue-800 text-white p-2 rounded-md hover:bg-blue-900 transition duration-300">
//                 {isListView ? <FiGrid size={20} /> : <FiList size={20} />}
//             </button>
//     );
// }
