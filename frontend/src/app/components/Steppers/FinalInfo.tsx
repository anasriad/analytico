"use client";

import { useDispatch, useSelector } from "react-redux";
import { previousStep, nextStep } from "@/app/States/StepperSlice";
import { RootState } from "@/app/States/Store";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import Select from "react-select";

const Confirm = () => {
    const dispatch = useDispatch();
    const { fileType, upload, ModelToBeUsed } = useSelector((state: RootState) => state.stepper);
    const [headers, setHeaders] = useState<string[]>([]);
    const [target, setTarget] = useState<string | null>(null);
    const [independents, setIndependents] = useState<string[]>([]);
    const [X_value, set_X_value] = useState<number>()
    useEffect(() => {
        if (upload && typeof upload !== 'string') {
            Papa.parse(upload, {
                complete: (result) => {
                    if (result.meta?.fields) {
                        setHeaders(result.meta.fields);
                    }
                },
                header: true,
            });
        }
    }, [upload]);

    const handleTargetChange = (selected: any) => {
        const targetVariable = selected.value;
        setTarget(targetVariable);
        setIndependents(headers.filter(h => h !== targetVariable));
    };

    const headerOptions = headers.map(h => ({ value: h, label: h }));

    const renderUploadInfo = () => {
        if (fileType === "URL for Scraping") {
            return (
                <div>
                    <p className="text-lg font-semibold">Scraping URL:</p>
                    <p className="text-green-400 break-words">{upload}</p>
                </div>
            );
        }

        if (upload) {
            return (
                <div>
                    <p className="text-lg font-semibold">Uploaded File:</p>
                    <p className="text-green-400">{typeof upload === 'string' ? upload : upload.name}</p>
                </div>
            );
        }

        if (fileType === "Database") {
            return (
                <div>
                    <p className="text-lg font-semibold">Database Selected:</p>
                    <p className="text-green-400">Yes (no file or URL needed)</p>
                </div>
            );
        }

        return <p className="text-red-400">No upload information found.</p>;
    };

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
            <h1 className="text-4xl mb-8 bg-black bg-opacity-60 p-4 rounded-3xl shadow-xl">
                Step 4: Confirm Your Configuration
            </h1>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full space-y-6">
                <div>
                    <h2 className="text-2xl mb-2">Dataset Type:</h2>
                    <p className="text-green-400 text-lg">{fileType}</p>
                </div>

                <div>
                    <h2 className="text-2xl mb-2">Dataset Upload:</h2>
                    {renderUploadInfo()}
                </div>

                <div>
                    <h2 className="text-2xl mb-2">Selected Model:</h2>
                    <p className="text-green-400 text-lg">{ModelToBeUsed || "None selected"}</p>
                </div>

                {headers.length > 0 && (
                    <div>
                        <h2 className="text-2xl mb-2">Select Target Variable:</h2>
                        <Select
                            options={headerOptions}
                            onChange={handleTargetChange}
                            placeholder="Choose target variable"
                            className="text-black"
                        />
                        {target && (
                            <div className="mt-4">
                                <p className="text-lg font-semibold text-green-400">Target: {target}</p>
                                <input className=" p-2 rounded-xl w-96" type="number" placeholder={`Enter the X value to predict the ${target}`}
                                    onChange={(e) => set_X_value(Number(e.target.value))} />
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex justify-between mt-8 w-full max-w-4xl">
                <button
                    className="bg-black text-white hover:bg-green-700 shadow-xl shadow-green-500 px-6 py-3 rounded-2xl transition-all"
                    onClick={() => dispatch(previousStep())}
                >
                    Previous
                </button>
                <button
                    className="bg-black text-white hover:bg-green-700 shadow-xl shadow-green-500 px-6 py-3 rounded-2xl transition-all"
                    onClick={() => {
                        if (!target) return alert("Please select a target variable.");
                        // Dispatch logic here to send target and features to backend
                        dispatch(nextStep());
                    }}
                >
                    Run this Model
                </button>
            </div>
        </div>
    );
};

export default Confirm;
