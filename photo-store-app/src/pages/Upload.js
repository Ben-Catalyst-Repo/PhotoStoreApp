import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';


export default function Upload({ userId }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const zuid = userId;

    // const filePath = location.state ? location.state.filePath : null;
    // const pathParts = filePath ? filePath.split("/") : null;
    // const fileName = pathParts ? pathParts.pop() : null;

    // const isFromShared = location.state ? location.state.isShared : null;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
            if (!allowedTypes.includes(selectedFile.type)) {
                setError("Only .png, .jpg, and .jpeg files are allowed.");
                setFile(null);
                return;
            }
            setError("");
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please select a valid file.");
            return;
        }

        try {
            setIsUploading(true);
            const stratus = window.catalyst.stratus;
            const bucket = stratus.bucket("photo-store-app");

            //if (fileName == null) {
                const checkObjectAvailability = await bucket.headObject(`photos/${zuid}/${file.name}`);

                console.log("Availability: " + JSON.stringify(checkObjectAvailability));
                if (checkObjectAvailability.content == true) {
                    toast.error(`Already file named ${file.name} is present`, {
                        theme: "colored"
                    }
                    );
                    setIsUploading(false);
                    setFile(null);
                    return;
                }
            //}

            //if (fileName == null) {
                const putObject = await bucket.putObject(`photos/${zuid}/${file.name}`, file);
                const response = await putObject.start();
                console.log(JSON.stringify(response));
            //}
            // else {
            //     console.log("FROM UPDATE");
            //     if (location.state == null || location.state.isShared == false) {
            //         const putObject = await bucket.putObject(`photos/${zuid}/${fileName}`, file);
            //         const response = await putObject.start();
            //         console.log("Normal Upload response: " + JSON.stringify(response));
            //     }

            //     else {
            //         const putObject = await bucket.putObject(`${filePath}`, file);
            //         const response = await putObject.start();
            //         console.log("Shared upload response: " + JSON.stringify(response));
            //     }
            // }

            const formData = new FormData();
            formData.append("image", file);

            // if (location.state != null && location.state.isShared == true) {
            //     const t = filePath.split("/")[1];
            //     console.log("Shared zuid: " + t);
            //     formData.append("id", t);
            // }
            // else {
                formData.append("id", zuid);
            // }

            // if (fileName != null) {
            //     formData.append("fileName", fileName);
            // }

            try {
                console.log("Thumbnail API Started");
                const response = await axios.post("/convertToThumbnailAndUpload", formData);
                console.log("Response: " + JSON.stringify(response));
            }
            catch (error) {
                console.error("Thumbnail Upload failed", error);
            }

            // if (fileName == null) {
                toast.success(`File uploaded: ${file.name}`, {
                    theme: "colored"
                }
                );
                navigate("/");
            // }
            // else {
            //     toast.success(`File updated: ${fileName}`, {
            //         theme: "colored"
            //     }
            //     );

            //     if (isFromShared == null || isFromShared == false) {
            //         navigate("/");
            //     }
            //     else {
            //         navigate("/sharedImages");
            //     }
            // }
        }
        catch (error) {
            console.error("Error during upload:", error);

            toast.error("Error uploading the file. Please try again.", {
                theme: "colored"
            });

        }
        finally {
            setIsUploading(false);
            setFile(null);
        }
    };

    return (

        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center flex flex-col items-center text-black">
                <h1 className="text-2xl font-semibold mb-4 text-black">Upload Image</h1>
                <p className="text-sm text-black mb-4">
                    NOTE: Only .png, .jpg, and .jpeg files are allowed.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full">
                    <div className="flex justify-center w-full">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="border p-2 rounded w-full text-center"
                            accept="image/png, image/jpg, image/jpeg"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isUploading}
                        className={`px-4 py-2 text-white rounded w-full ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                            }`}>
                        {isUploading ? "Uploading..." : "Upload"}
                    </button>
                </form>
            </div>
        </div>

    );
};
