"use client";

import { useDispatch, useSelector } from "react-redux";
import { fillForm, nextStep, previousStep } from "@/app/States/StepperSlice";
import { RootState } from "@/app/States/Store";

const ModelSelection = () => {
    const Dispatch = useDispatch();
    const selectedType = useSelector((state: RootState) => state.stepper.fileType);
    const handleSelectModel = (model: string) => {
        Dispatch(fillForm({ type: "ModelToBeUsed", data: model }));
        Dispatch(nextStep());
    };

    const renderModelButtons = () => {
        if (selectedType === "Image") {
            return (
                <>
                    <button
                        onClick={() => handleSelectModel("AI Model 1")}
                        className="bg-black bg-opacity-70 p-4 rounded-xl text-center hover:bg-green-700 transition-all shadow-lg shadow-green-500"
                    >
                        AI Model 1
                    </button>
                    <button
                        onClick={() => handleSelectModel("AI Model 2")}
                        className="bg-black bg-opacity-70 p-4 rounded-xl text-center hover:bg-green-700 transition-all shadow-lg shadow-green-500"
                    >
                        AI Model 2
                    </button>
                    <button
                        onClick={() => handleSelectModel("AI Model 3")}
                        className="bg-black bg-opacity-70 p-4 rounded-xl text-center hover:bg-green-700 transition-all shadow-lg shadow-green-500"
                    >
                        AI Model 3
                    </button>
                </>
            );
        }

        if (selectedType === "CSV" || selectedType === "JSON") {
            return (
                <>
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-40">
                            {["Linear Regression", "Decision Tree"].map(
                                (type) => (
                                    <button
                                        key={type}
                                        onClick={() => handleSelectModel(type)}
                                        className={`${selectedType === type
                                            ? "bg-green-700 shadow-green-500"
                                            : "bg-black bg-opacity-70"
                                            } 
                                            p-4 rounded-xl text-center hover:bg-green-700 
                                            transition-all shadow-lg w-36`}
                                    >
                                        {type}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </>
            );
        }

        return <p className="text-lg text-gray-400">Please select a valid dataset type to continue.</p>;
    };

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
            <h1 className="text-4xl mb-8 bg-black bg-opacity-60 p-4 rounded-3xl shadow-xl">
                Step 3: Choose Your Model
            </h1>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full">
                <h2 className="text-2xl mb-6">Choose a model based on your selected dataset</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {renderModelButtons()}
                </div>
            </div>
            <div className="flex justify-between mt-8 w-full max-w-4xl">
                <button
                    onClick={() => Dispatch(previousStep())}
                    className="bg-black text-white hover:bg-green-700 shadow-xl shadow-green-500 px-6 py-3 rounded-2xl transition-all"
                >
                    Previous
                </button>
                <button
                    onClick={() => Dispatch(nextStep())}
                    className={`${selectedType
                        ? "bg-black text-white hover:bg-green-700 shadow-xl shadow-green-500 border"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        } px-6 py-3 rounded-2xl transition-all`}
                    disabled={!selectedType}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ModelSelection;
