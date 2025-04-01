// import React, { useState, useEffect } from 'react';
// import { FiMoreVertical, FiShare2, FiChevronRight, FiX } from "react-icons/fi"; 
// import ImageThumbnail from '../ImageThumbnail';
// import { useNavigate } from "react-router-dom";
// import { fetchImages, handleDelete, handleDownload } from "../service/ImageService";
// import { toast } from 'react-toastify';


// export default function Grid({ userId }) {
//     const [imageDetails, setImageDetails] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [openMenuIndex, setOpenMenuIndex] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const [users, setUsers] = useState([]);
//     const [selectedUserIndex, setSelectedUserIndex] = useState(null);
//     const [openShareIndex, setOpenShareIndex] = useState(null);

//     const [selectedImage, setSelectedImage] = useState(null);

//     const navigate = useNavigate();

//     const imagesPerPage = 9;

//     useEffect(() => {
//         fetchImages(userId,setImageDetails,setLoading);
//     },[userId]);

//     const fetchUsers = async () => {
//         try {
//             const response = await fetch("https://photostore-10096436359.development.catalystappsail.com/getAllUsers");
//             const data = await response.json();
//             setUsers(data);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };

//     const handleShareClick = async (index, e) => {
//         e.preventDefault();
//         e.stopPropagation();
        
//         if (openShareIndex === index) {
//             setOpenShareIndex(null);
//             return;
//         }
    
//         await fetchUsers();
//         setOpenShareIndex(index);
//     };

//     const toggleUserOptions = (index, e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setSelectedUserIndex(selectedUserIndex === index ? null : index);
//     };

    

//     const handleShareAction = async (name, id, path, action) => {
//         try {
//             const response = await fetch(`https://photostore-10096436359.development.catalystappsail.com/shareDetails`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ userName: name, imagePath: path, zuid: id, isUpdate: action, sharedBy: userId }),
//             });

//             const data = await response.json();
//             console.log("RES: "+JSON.stringify(data));
//             if(data.message == "Access Provided")
//             {
//                 toast.success("Image Shared Successfully",{
//                                 theme:"colored"
//                             });
//             }
//             else
//             {
//                 toast.error(data.message,{
//                                 theme:"colored"
//                             });
//             }
//             console.log("API Response:", data);
//         } catch (error) {
//             console.error("Error calling API:", error);
//         }
//     };

//     const openPreview = (imageUrl) => {
//         setSelectedImage(imageUrl);
//     };

//     const closePreview = () => {
//         setSelectedImage(null);
//     };

//     const indexOfLastImage = currentPage * imagesPerPage;
//     const indexOfFirstImage = indexOfLastImage - imagesPerPage;
//     const currentImages = imageDetails.slice(indexOfFirstImage, indexOfLastImage);
//     const totalPages = Math.ceil(imageDetails.length / imagesPerPage);
    
//     console.log("indexOfLastImage: "+indexOfLastImage);
//     console.log("indexOfFirstImage: "+indexOfFirstImage);
//     console.log("currentImages: "+currentImages);
//     console.log("totalPages: "+totalPages);
//     console.log("CONTENTS "+imageDetails)
//     console.log("CONTENTS ------- "+JSON.stringify(imageDetails));

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

//     const toggleMenu = (index, e) => {
//         e.preventDefault();  
//         e.stopPropagation(); 
//         setOpenMenuIndex(openMenuIndex === index ? null : index); 
//     };

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
//     <div className="max-w-screen-lg w-full">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
//             {currentImages.map((image, index) => (
//             //     <div key={image.key} className={`flex flex-col items-center w-full max-w-xs relative 
//             //    ${openShareIndex === index ? '' : 'transition-transform hover:scale-110'}`} >


//             <div key={image.key} className={`flex flex-col items-center w-full max-w-xs relative 
//                 ${openShareIndex === index ? '' : 'transition-transform hover:scale-110'}`} onClick={() => openPreview(image.object_url)} >
//                     {/* <a href={image.object_url} target="_blank" rel="noopener noreferrer" className="block"> */}
                    
//                         {/* <div className="w-full max-w-xs h-auto flex items-center justify-center bg-gray-200 rounded-lg shadow-lg relative"> */}

//                         <div className="max-w-xs h-auto flex items-center justify-center bg-gray-200 rounded-lg shadow-lg relative">
                            
//                         <button className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100" 
//                             onClick={(e) => handleShareClick(index, e)}>
//                             <FiShare2 size={15} className="text-gray-600" />
//                         </button>

//                         {openShareIndex === index && users.length > 0 && (
//                             <div className="absolute top-10 left-2 bg-white text-black border rounded shadow-lg w-40 text-sm z-50">
//                                 {users.map((user, idx) => (
//                                     <div key={user.id} className="relative">
//                                         <button className="flex justify-between items-center w-full text-left text-black px-4 py-2 hover:bg-gray-200"
//                                             onClick={(e) => toggleUserOptions(idx, e)}>
//                                                 {user.name}
//                                                 <FiChevronRight className="text-gray-600" />
//                                             </button>

//                                         {selectedUserIndex === idx && (
//                                             <div 
//                                                 className="absolute top-0 left-full ml-2 bg-white text-black border rounded shadow-lg w-32 text-sm z-50"
//                                                 style={{ zIndex: 1000, pointerEvents: "auto" }} // Ensures it's above and interactive
//                                             >
//                                                 <button 
//                                                     className="block w-full px-4 py-2 text-left hover:bg-gray-200"
//                                                     onMouseEnter={() => document.body.style.pointerEvents = "none"}
//                                                     onMouseLeave={() => document.body.style.pointerEvents = "auto"}
//                                                     onClick={(e) => {
//                                                         e.preventDefault();
//                                                         e.stopPropagation();
//                                                         handleShareAction(user.name, user.zuid,image.key, false);
//                                                     }}
//                                                 >
//                                                     View Access
//                                                 </button>
//                                                 <button 
//                                                     className="block w-full px-4 py-2 text-left hover:bg-gray-200"
//                                                     onMouseEnter={() => document.body.style.pointerEvents = "none"}
//                                                     onMouseLeave={() => document.body.style.pointerEvents = "auto"}
//                                                     onClick={(e) => {
//                                                         e.preventDefault();
//                                                         e.stopPropagation();
//                                                         handleShareAction(user.name,user.zuid,image.key,true);
//                                                     }}
//                                                 >
//                                                     Edit Access
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                             <ImageThumbnail imageUrl = {image.object_url} />
//                             <button
//                                 className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
//                                 onClick={(e) => toggleMenu(index, e)}
//                             >
//                                 <FiMoreVertical size={15} className="text-gray-600" />
//                             </button>

//                             {openMenuIndex === index && (
//                                 <div className="absolute bottom-10 right-2 text-blue-600 bg-white border rounded shadow-lg w-32 text-sm z-50">

//                                     <button className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//                                     onClick={(e) => {
//                                         e.preventDefault();
//                                         e.stopPropagation();
//                                         handleDelete(image.key,setImageDetails,setOpenMenuIndex,false);
//                                         navigate("/upload",{ state: { filePath: image.key, isShared: false } });
//                                     }}>
//                                         Update
//                                     </button>
//                                     <button className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//                                     onClick={(e) => {
//                                         e.preventDefault();
//                                         e.stopPropagation();
//                                         handleDownload(image.key,setOpenMenuIndex);
//                                     }}>
//                                         Download
//                                     </button>
//                                     <button className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100" 
//                                         onClick={(e) => {
//                                             e.preventDefault();
//                                             e.stopPropagation();
//                                             handleDelete(image.key,setImageDetails,setOpenMenuIndex);
//                                         }}>
//                                         Delete
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     {/* </a> */}
//                     <div className="w-full max-w-xs mt-3">
//                         <p className="text-xl font-medium text-white text-center break-words">
//                             {image.key.split('/').pop()}
//                         </p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     </div>

//     <div className="flex mt-6 justify-center items-center space-x-4">
//         <button onClick={prevPage}
//             disabled={currentPage === 1} className="px-4 py-2 bg-blue-700 text-white rounded disabled:opacity-50 disabled:bg-blue-200">
//              Previous
//         </button>
//         <span className="text-lg font-semibold text-center w-20">Page {currentPage}</span>
//         <button onClick={nextPage} disabled={indexOfLastImage >= imageDetails.length} className="px-4 py-2 bg-blue-700 text-white rounded disabled:opacity-50 disabled:bg-blue-200">
//             Next
//         </button>
//     </div>
//     </>
//         )}
//             </>
            
//             )}

//         {selectedImage && (
//                         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
//                             <div className="relative">
//                                 <button 
//                                     className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
//                                     onClick={closePreview}
//                                 >
//                                     <FiX size={20} className="text-gray-600" />
//                                 </button>
//                                 {/* <img src={selectedImage} alt="Preview" className="max-w-full max-h-screen rounded-lg shadow-lg" /> */}
//                                 <img src={selectedImage} alt="Preview" className="max-w-full max-h-[50vh] rounded-lg shadow-lg" />
//                             </div>
//                         </div>
//                     )}
// </div>
//     );
// }



