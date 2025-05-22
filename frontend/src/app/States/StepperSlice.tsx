"use client";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";
interface StepperState {
    currentStep: number;
    fileType: string;
    upload: any;
    database: boolean;
    url: string;
    ModelToBeUsed: string;
    file?: String
}

const initialState: StepperState = {
    currentStep: 1,
    fileType: '',
    upload: '',
    database: false,
    url: '',
    ModelToBeUsed: '',
    file: ''
};

const stepperSlice = createSlice({
    name: 'stepper',
    initialState,
    reducers: {
        nextStep: (state) => {
            if (state.currentStep < 5) {
                state.currentStep += 1;
            }
        },
        previousStep: (state) => {
            if (state.currentStep > 1) {
                state.currentStep -= 1;
            }
        },
        fillForm: (state, action) => {
            const { type, data } = action.payload
            switch (type) {
                case 'fileType':
                    state.fileType = data
                    break;
                case 'upload':
                    state.upload = data
                    state.file = data.name
                    break;
                case 'ModelToBeUsed':
                    state.ModelToBeUsed = data
                    break;
                default:
                    break;
            }
        }
    },
});

export const { nextStep, previousStep, fillForm } = stepperSlice.actions;

export default stepperSlice.reducer;

export const selectStepper = (state: RootState) => state.stepper;
