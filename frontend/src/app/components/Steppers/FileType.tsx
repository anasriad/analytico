"use client";

import { fillForm, nextStep } from "@/app/States/StepperSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const FileType = () => {
    const Dispatch = useDispatch()
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleSelect = (type: string) => {
        setSelectedType((prevSelected) => (prevSelected === type ? null : type));
    };

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
            <h1 className="text-4xl mb-8 bg-black bg-opacity-60 p-4 rounded-3xl shadow-xl">
                Step 1: Choose Your Dataset
            </h1>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full">
                <h2 className="text-2xl mb-6">Select a Dataset Type</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {["CSV", "JSON", "Database", "URL for Scraping", "Image"].map(
                        (type) => (
                            <button
                                key={type}
                                onClick={() => handleSelect(type)}
                                className={`${selectedType === type
                                    ? "bg-green-700 shadow-green-500"
                                    : "bg-black bg-opacity-70"
                                    } p-4 rounded-xl text-center hover:bg-green-700 transition-all shadow-lg`}
                            >
                                {type}
                            </button>
                        )
                    )}
                </div>
            </div>
            <div className="flex justify-between mt-8 w-full max-w-4xl">
                <button
                    disabled
                    className="bg-gray-700 text-gray-400 px-6 py-3 rounded-2xl cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    className={`${selectedType
                        ? "bg-black text-white hover:bg-green-700 shadow-xl shadow-green-500 border"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        } px-6 py-3 rounded-2xl transition-all`}
                    disabled={!selectedType}
                    onClick={() => {
                        Dispatch(fillForm({ type: 'fileType', data: selectedType }))
                        Dispatch(nextStep())
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FileType;
