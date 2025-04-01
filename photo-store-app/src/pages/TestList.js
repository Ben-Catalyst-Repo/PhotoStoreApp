// import React, { useState, useEffect } from 'react';
// import { FiDownload, FiTrash2, FiEye, FiEdit,FiChevronRight, FiShare2 } from "react-icons/fi"; 
// import ImageThumbnail from '../ImageThumbnail';
// import { fetchImages, handleDelete, handleDownload } from "../service/ImageService";
// import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';


// export default function List({ userId }) {
//     const [imageDetails, setImageDetails] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
    
//     const [users, setUsers] = useState([]);
//     const [selectedUserIndex, setSelectedUserIndex] = useState(null);
//     const [openShareIndex, setOpenShareIndex] = useState(null);

//     const imagesPerPage = 10;

//     useEffect(() => {
//             fetchImages(userId,setImageDetails,setLoading);
//         },[userId]);

//     const indexOfLastImage = currentPage * imagesPerPage;
//     const indexOfFirstImage = indexOfLastImage - imagesPerPage;
//     const currentImages = imageDetails.slice(indexOfFirstImage, indexOfLastImage);
//     const totalPages = Math.ceil(imageDetails.length / imagesPerPage);
    
//     const nextPage = () => {
//         if (indexOfLastImage < imageDetails.length) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const prevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handleShareAction = async (name, id, path, action) => {
//             try {
//                 const response = await fetch(`https://photostore-10096436359.development.catalystappsail.com/shareDetails`, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ userName: name, imagePath: path, zuid: id, isUpdate: action, sharedBy: userId }),
//                 });
    
//                 const data = await response.json();
//                 console.log("RES: "+JSON.stringify(data));
//                 if(data.message == "Access Provided")
//                 {
//                     toast.success("Image Shared Successfully",{
//                                     theme:"colored"
//                                 });
//                 }
//                 else
//                 {
//                     toast.error(data.message,{
//                                     theme:"colored"
//                                 });
//                 }
//                 console.log("API Response:", data);
//             } catch (error) {
//                 console.error("Error calling API:", error);
//             }
//         };

//         const handleShareClick = async (index, e) => {
//             e.preventDefault();
//             e.stopPropagation();
            
//             if (openShareIndex === index) {
//                 setOpenShareIndex(null);
//                 return;
//             }
        
//             await fetchUsers();
//             setOpenShareIndex(index);
//         };
    
//         const toggleUserOptions = (index, e) => {
//             e.preventDefault();
//             e.stopPropagation();
//             setSelectedUserIndex(selectedUserIndex === index ? null : index);
//         };

//         const fetchUsers = async () => {
//             try {
//                 const response = await fetch("https://photostore-10096436359.development.catalystappsail.com/getAllUsers");
//                 const data = await response.json();
//                 setUsers(data);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };
    

//     return (
//         <div className="min-h-screen bg-black flex flex-col items-center p-6">
//             {loading?(
//             <div className="flex justify-center items-center h-screen">
//                 <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//             ):(
            
//             <>
//             {imageDetails.length == 0 ? (
//                 <>
//                 <div className="flex items-center justify-center h-screen">
//                     <p className="text-white text-lg font-semibold text-center">
//                         No files found. Click the Upload button to upload your photos.
//                     </p>
//                 </div>
//                 </>
//             ):
//             (
//             <>
//             <div className="max-w-screen-md w-full">
//                 <div className="flex flex-col space-y-2"> 
//                     {currentImages.map((image,index) => (
//                         // <div key={image.key} className="flex items-center w-full bg-gray-800 p-4 rounded-md transition-transform hover:scale-110">
//                         <div key={image.key} className={`flex items-center w-full bg-gray-800 p-4 rounded-md 
//                             ${openShareIndex === index ? '' : 'transition-transform hover:scale-110'}`}>
//                             <ImageThumbnail imageUrl={image.object_url} listStyle={1} />

//                             <div className="ml-2 flex-1">
//                                 <p className="text-white text-sm font-medium break-words">{image.key.split('/').pop()}</p>
//                             </div>

//                             <button
//                                 className="bg-white p-1 rounded-full shadow-md hover:bg-gray-100 mx-1"
//                                 onClick={() => window.open(image.object_url,"_blank")}
//                             >
//                                 <FiEye size={16} className="text-gray-600" />
//                             </button>

//                             <button
//                                 className="bg-white p-1 rounded-full shadow-md hover:bg-gray-100 mx-1"
//                                 onClick={() => {
//                                     handleDelete(image.key,setImageDetails,null,false);
//                                     navigate("/upload",{ state: { filePath: image.key } });
//                                 }}
//                             >
//                                 <FiEdit size={16} className="text-gray-600" />
//                             </button>

//                             <button
//                                 className="bg-white p-1 rounded-full shadow-md hover:bg-gray-100 mx-1"
//                                 onClick={() => handleDownload(image.key,null)}
//                             >
//                                 <FiDownload size={16} className="text-gray-600" />
//                             </button>
//                             <button
//                                 className="bg-white p-1 rounded-full shadow-md hover:bg-red-100"
//                                 onClick={() => handleDelete(image.key,setImageDetails,null)}
//                             >
//                                 <FiTrash2 size={16} className="text-red-600" />
//                             </button>
//                             <button className="bg-white p-1 rounded-full shadow-md hover:bg-gray-100 mx-1" 
//                                 onClick={(e) => handleShareClick(index, e)}>
//                                 <FiShare2 size={15} className="text-gray-600" />
//                             </button>
    
//                             {openShareIndex === index && users.length > 0 && (
//                                 // <div className="absolute top-10 left-2 bg-white text-black border rounded shadow-lg w-40 text-sm z-50">
//                                 <div className="block top-10 right-4 bg-white text-black border rounded shadow-lg w-40 text-sm z-50">
//                                 {/* <div className="absolute top-10 left-full ml-2 bg-white text-black border rounded shadow-lg w-40 text-sm z-50"> */}
//                                     {users.map((user, idx) => (
//                                         <div key={user.id} className="relative">
//                                             <button className="flex justify-between items-center w-full text-left text-black px-4 py-2 hover:bg-gray-200"
//                                                 onClick={(e) => toggleUserOptions(idx, e)}>
//                                                     {user.name}
//                                                     <FiChevronRight className="text-gray-600" />
//                                                 </button>
    
//                                             {selectedUserIndex === idx && (
//                                                 <div 
//                                                     className="absolute top-0 left-full ml-2 bg-white text-black border rounded shadow-lg w-32 text-sm z-50"
//                                                     style={{ zIndex: 1000, pointerEvents: "auto" }} // Ensures it's above and interactive
//                                                 >
//                                                     <button 
//                                                         className="block w-full px-4 py-2 text-left hover:bg-gray-200"
//                                                         onMouseEnter={() => document.body.style.pointerEvents = "none"}
//                                                         onMouseLeave={() => document.body.style.pointerEvents = "auto"}
//                                                         onClick={(e) => {
//                                                             e.preventDefault();
//                                                             e.stopPropagation();
//                                                             handleShareAction(user.name, user.zuid,image.key, false);
//                                                         }}
//                                                     >
//                                                         View Access
//                                                     </button>
//                                                     <button 
//                                                         className="block w-full px-4 py-2 text-left hover:bg-gray-200"
//                                                         onMouseEnter={() => document.body.style.pointerEvents = "none"}
//                                                         onMouseLeave={() => document.body.style.pointerEvents = "auto"}
//                                                         onClick={(e) => {
//                                                             e.preventDefault();
//                                                             e.stopPropagation();
//                                                             handleShareAction(user.name,user.zuid,image.key,true);
//                                                         }}
//                                                     >
//                                                         Edit Access
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="flex mt-4 justify-center items-center space-x-2">
//                 <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 bg-blue-700 text-white rounded disabled:opacity-50 disabled:bg-blue-200">
//                     Previous
//                 </button>
//                 <span className="text-sm font-semibold text-center w-16">Page {currentPage}</span>
//                 <button onClick={nextPage} disabled={indexOfLastImage >= imageDetails.length} className="px-3 py-1 bg-blue-700 text-white rounded disabled:opacity-50 disabled:bg-blue-200">
//                     Next
//                 </button>
//             </div>
//             </>
//         )}
//             </>
//             )}
//         </div>
//     );
// }
