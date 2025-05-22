"use client";

import Header from "../components/Header"
import { useSelector, useDispatch } from 'react-redux'
import { selectStepper, nextStep, previousStep } from "../States/StepperSlice"
import FileType from "../components/Steppers/FileType";
import Upload from "../components/Steppers/Upload";
import ModelSelection from "../components/Steppers/Model";
import Confirm from "../components/Steppers/FinalInfo";
export default function UploadMultiForm() {
    const Step = useSelector(selectStepper);
    const DisplayStep = () => {
        switch (Step.currentStep) {
            case 1:
                return <FileType />
            case 2:
                return <ModelSelection />
            case 3:
                return <Upload />
            case 4:
                return <Confirm />
            default:
                break;
        }
    }
    return <>
        <div className="overflow-x-hidden w-full h-screen">
            <Header />
            {DisplayStep()}
        </div>
    </>

}