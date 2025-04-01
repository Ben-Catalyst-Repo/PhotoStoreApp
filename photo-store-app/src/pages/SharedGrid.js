// import React, { useState, useEffect } from 'react';
// import { FiMoreVertical } from "react-icons/fi"; 
// import ImageThumbnail from '../ImageThumbnail';
// import { useNavigate } from "react-router-dom";
// import { fetchSharedImages, handleDelete, handleDownload } from "../service/ImageService";


// export default function SharedGrid({ userId }) {
//     const [imageDetails, setImageDetails] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [openMenuIndex, setOpenMenuIndex] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const navigate = useNavigate();

//     const imagesPerPage = 9;

//     useEffect(() => {
//         fetchSharedImages(userId,setImageDetails,setLoading);
//     },[userId]);

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
//                         No Shared files found.
//                     </p>
//                 </div>
//                 </>
//             ):
//             (
//             <>
//     <div className="max-w-screen-lg w-full">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
//             {currentImages.map((image, index) => (
//                 <div key={image.key} className="flex flex-col items-center w-full max-w-xs relative transition-transform hover:scale-110">
//                     <a href={image.object_url} target="_blank" rel="noopener noreferrer" className="block">
//                         <div className="w-full max-w-xs h-auto flex items-center justify-center bg-gray-200 rounded-lg shadow-lg relative">
                            
//                             <ImageThumbnail imageUrl = {image.object_url} />
//                             <button
//                                 className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
//                                 onClick={(e) => toggleMenu(index, e)}
//                             >
//                                 <FiMoreVertical size={15} className="text-gray-600" />
//                             </button>

//                             {openMenuIndex === index && (
//                                 <div className="absolute bottom-10 right-2 text-blue-600 bg-white border rounded shadow-lg w-32 text-sm z-50">
//                                     {image.isEditAccess && (
//                                         <>
//                                             <button
//                                                 className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//                                                 onClick={(e) => {
//                                                     e.preventDefault();
//                                                     e.stopPropagation();
//                                                     handleDelete(image.key, setImageDetails, setOpenMenuIndex, false);
//                                                     navigate("/upload", { state: { filePath: image.key, isShared: true } });
//                                                 }}
//                                             >
//                                                 Update
//                                             </button>
//                                             <button
//                                                 className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
//                                                 onClick={(e) => {
//                                                     e.preventDefault();
//                                                     e.stopPropagation();
//                                                     handleDelete(image.key, setImageDetails, setOpenMenuIndex);
//                                                 }}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </>
//                                     )}
//                                     <button
//                                         className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//                                         onClick={(e) => {
//                                             e.preventDefault();
//                                             e.stopPropagation();
//                                             handleDownload(image.key, setOpenMenuIndex);
//                                         }}
//                                     >
//                                         Download
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </a>
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
// </div>
//     );
// }