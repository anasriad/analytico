"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fillForm, nextStep, previousStep } from "@/app/States/StepperSlice";
import { RootState } from "@/app/States/Store";

const Upload = () => {
    const dispatch = useDispatch();
    const selectedType = useSelector((state: RootState) => state.stepper.fileType);
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState<string>("");
    if (selectedType === 'database') dispatch(fillForm({ type: 'upload', data: 'Database' }))
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };


    return (
        <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
            <h1 className="text-4xl mb-8 bg-black bg-opacity-60 p-4 rounded-3xl shadow-xl">
                Step 2: Upload Your Dataset
            </h1>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full">
                <h2 className="text-2xl mb-6">
                    {selectedType === "Database"
                        ? "Database Selected. Skipping to Next Step!"
                        : "Upload your file or provide a URL"}
                </h2>
                {selectedType === "CSV" || selectedType === "JSON" || selectedType === "Image" ? (
                    <div className="flex flex-col items-center gap-4">
                        <label
                            htmlFor="file-upload"
                            className="bg-black bg-opacity-70 text-white p-6 rounded-2xl cursor-pointer hover:bg-green-700 shadow-lg transition-all flex items-center justify-center w-80 h-16"
                        >
                            <span className="text-lg font-semibold">Click to Upload Dataset</span>
                            <span className="ml-4 text-sm">CSV, JSON, or Image</span>
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            accept={selectedType === "Image" ? "image/*" : ".csv, .json"}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        {file && (
                            <div className="text-center mt-4">
                                <p className="text-lg text-green-500">{file.name}</p>
                                <p className="text-sm text-gray-400">Ready for upload</p>
                            </div>
                        )}
                    </div>

                ) : selectedType === "URL for Scraping" ? (
                    <input
                        type="url"
                        value={url}
                        onChange={handleUrlChange}
                        placeholder="Enter URL for scraping"
                        className="bg-black bg-opacity-70 text-white p-4 rounded-xl w-full max-w-2xl mt-4 hover:bg-green-700 transition-all"
                    />
                ) : null}
            </div>
            <div className="flex justify-between mt-8 w-full max-w-4xl">
                <button
                    className="bg-black text-white hover:bg-green-700 shadow-xl shadow-green-500 border px-6 py-3 rounded-2xl transition-all"
                    onClick={() => dispatch(previousStep())}
                >
                    Previous
                </button>
                <button
                    className={`${file || url
                        ? "bg-black text-white hover:bg-green-700 shadow-xl shadow-green-500 border"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        } px-6 py-3 rounded-2xl transition-all`}
                    disabled={!file && !url}
                    onClick={() => {
                        dispatch(fillForm({ type: 'upload', data: file }))
                        dispatch(nextStep())
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Upload;
