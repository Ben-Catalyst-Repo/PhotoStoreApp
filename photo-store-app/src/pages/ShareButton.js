// // import React, { useState } from "react";

// // const ShareButton = () => {
// //     const [users, setUsers] = useState([]);
// //     const [openDropdown, setOpenDropdown] = useState(false);

// //     const fetchUsers = async () => {
// //         try {
// //             const response = await fetch("https://photostore-10096436359.development.catalystappsail.com/getAllUsers");
// //             const data = await response.json();
// //             setUsers(data);
// //         } catch (error) {
// //             console.error("Error fetching users:", error);
// //         }
// //     };

// //     const handleShareClick = async () => {
// //         if (!openDropdown) {
// //             await fetchUsers(); // Fetch users only when opening dropdown
// //         }
// //         setOpenDropdown(!openDropdown); // Toggle dropdown
// //     };

// //     return (
// //         <div className="relative">
// //             {/* Share Button */}
// //             <button
// //                 onClick={handleShareClick}
// //                 className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition duration-300"
// //             >
// //                 Share
// //             </button>

// //             {/* Dropdown Menu */}
// //             {openDropdown && (
// //                 <div className="absolute top-12 left-0 w-48 bg-white border rounded-md shadow-lg">
// //                     {users.length > 0 ? (
// //                         users.map((user) => (
// //                             <button
// //                                 key={user.zuid}
// //                                 className="block w-full text-left text-black px-4 py-2 hover:bg-gray-200"
// //                                 onClick={() => console.log(`Shared with: ${user.mailId}`)}
// //                             >
// //                                 {user.name}
// //                             </button>
// //                         ))
// //                     ) : (
// //                         <p className="text-gray-500 px-4 py-2">No users found</p>
// //                     )}
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default ShareButton;



// // import React, { useState } from "react";
// // import { FiChevronRight } from "react-icons/fi"; // Importing the chevron icon

// // export default function ShareButton ({userId})  {
// //     const [users, setUsers] = useState([]);
// //     const [openDropdown, setOpenDropdown] = useState(false);
// //     const [submenuIndex, setSubmenuIndex] = useState(null); // Track which user's submenu is open

// //     const fetchUsers = async () => {
// //         try {
// //             const response = await fetch("https://photostore-10096436359.development.catalystappsail.com/getAllUsers"); // Replace with your API URL
// //             const data = await response.json();
// //             setUsers(data);
// //         } catch (error) {
// //             console.error("Error fetching users:", error);
// //         }
// //     };

// //     const handleShareClick = async (e) => {
// //         e.preventDefault();
// //             e.stopPropagation();
// //         if (!openDropdown) {
// //             await fetchUsers(); // Fetch users only when opening dropdown
// //             e.preventDefault();
// //             e.stopPropagation();
// //         }
// //         setOpenDropdown(!openDropdown); // Toggle dropdown
// //     };

// //     const toggleSubmenu = (index) => {
// //         setSubmenuIndex(submenuIndex === index ? null : index); // Open or close submenu
// //     };

// //     const handleShareAction = async (name, id, action) => {
// //         try {
// //             const response = await fetch(`https://photostore-10096436359.development.catalystappsail.com/shareDetails`, {
// //                 method: "POST",
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                 },
// //                 body: JSON.stringify({ 
// //                     userName: name,
// //                     imagePath: `photos/${userId}`,
// //                     zuid: id,
// //                     isUpdate: action }),
// //             });
    
// //             const data = await response.json();
// //             console.log("API Response:", data);
// //         } catch (error) {
// //             console.error("Error calling API:", error);
// //         }
// //     };
    
// //     return (
// //         // <div className="relative">
// //         <div className="block">
// //             {/* Share Button */}
// //             <button
// //                 onClick={handleShareClick}
// //                 className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition duration-300"
// //             >Share Images</button>

// //             {/* Dropdown Menu */}
// //             {openDropdown && (
// //                 // <div className="absolute top-12 left-0 w-56 bg-white border rounded-md shadow-lg">
// //                 <div className="block top-full left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
// //                  {/* <div className="block w-full left-0 mt-2 w-56 text-left hover:bg-gray-100"> */}
// //                     {users.length > 0 ? (
// //                         users.map((user, index) => (
// //                             // <div key={user.zuid} className="relative">
// //                             <div key={user.zuid} className="block">
// //                                 <button
// //                                     className="flex justify-between items-center w-full text-left text-black px-4 py-2 hover:bg-gray-200"
// //                                     onClick={(e) => {
// //                                         e.preventDefault();
// //                                         e.stopPropagation();
// //                                         toggleSubmenu(index);}}
// //                                 >
// //                                     {user.name}
// //                                     <FiChevronRight className="text-gray-500" /> {/* Chevron icon */}
// //                                 </button>

// //                                 {/* Submenu for Edit & View */}
// //                                 {submenuIndex === index && (
// //                                     <div className="absolute top-0 left-full ml-2 w-32 bg-white border rounded-md shadow-lg">
// //                                         <button className="block w-full text-black px-4 py-2 text-left hover:bg-gray-200"
// //                                                 onClick={(e) => {
// //                                                     e.preventDefault();
// //                                                     e.stopPropagation();
// //                                                     handleShareAction(user.name, user.zuid, true);
// //                                                     }}>
// //                                             Edit Access
// //                                         </button>
// //                                         <button className="block w-full text-black px-4 py-2 text-left hover:bg-gray-200"
// //                                                 onClick={() => handleShareAction(user.name, user.zuid, false)}>
// //                                             View Access
// //                                         </button>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         ))
// //                     ) : (
// //                         <p className="text-gray-500 px-4 py-2">No users found</p>
// //                     )}
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // //export default ShareButton;


// import React, { useState } from "react";
// import { FiChevronRight } from "react-icons/fi";

// export default function ShareButton({ userId }) {
//     const [users, setUsers] = useState([]);
//     const [openDropdown, setOpenDropdown] = useState(false);
//     const [submenuIndex, setSubmenuIndex] = useState(null);

//     const fetchUsers = async () => {
//         try {
//             const response = await fetch("https://photostore-10096436359.development.catalystappsail.com/getAllUsers");
//             const data = await response.json();
//             setUsers(data);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };

//     const handleShareClick = async (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         if (!openDropdown) {
//             await fetchUsers();
//         }
//         setOpenDropdown(!openDropdown);
//     };

//     const toggleSubmenu = (index, e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setSubmenuIndex(submenuIndex === index ? null : index);
//     };

//     const handleShareAction = async (name, id, action) => {
//         try {
//             const response = await fetch(`https://photostore-10096436359.development.catalystappsail.com/shareDetails`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ userName: name, imagePath: `photos/${userId}`, zuid: id, isUpdate: action }),
//             });

//             const data = await response.json();
//             console.log("API Response:", data);
//         } catch (error) {
//             console.error("Error calling API:", error);
//         }
//     };

//     return (
//         <div className="relative">
//             {/* Share Button */}
//             <button
//                 onClick={handleShareClick}
//                 className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition duration-300"
//             >
//                 Share Images
//             </button>

//             {/* Dropdown Menu - Stays Above Other Elements */}
//             {openDropdown && (
//                 <div className="absolute top-full left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
//                     {users.length > 0 ? (
//                         users.map((user, index) => (
//                             <div key={user.zuid} className="relative">
//                                 <button
//                                     className="flex justify-between items-center w-full text-left text-black px-4 py-2 hover:bg-gray-200"
//                                     onClick={(e) => toggleSubmenu(index, e)}
//                                 >
//                                     {user.name}
//                                     <FiChevronRight className="text-gray-500" />
//                                 </button>

//                                 {/* Submenu (Edit/View) - Positioned to the right, Prevents Overlap Issues */}
//                                 {submenuIndex === index && (
//                                     <div className="absolute top-0 left-full ml-2 w-32 bg-white border rounded-md shadow-lg z-50">
//                                         <button
//                                             className="block w-full text-black px-4 py-2 text-left hover:bg-gray-200"
//                                             onClick={(e) => {
//                                                 e.preventDefault();
//                                                 e.stopPropagation();
//                                                 handleShareAction(user.name, user.zuid, true);
//                                             }}
//                                         >
//                                             Edit Access
//                                         </button>
//                                         <button
//                                             className="block w-full text-black px-4 py-2 text-left hover:bg-gray-200"
//                                             onClick={(e) => {
//                                                 e.preventDefault();
//                                                 e.stopPropagation();
//                                                 handleShareAction(user.name, user.zuid, false);
//                                             }}
//                                         >
//                                             View Access
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500 px-4 py-2">No users found</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };
