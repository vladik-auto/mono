import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@shared/lib';


interface initialState {
    toolbar: boolean,
    videoProcessing: boolean
}

const intitialState: initialState = {
    toolbar: true,
    videoProcessing: false,
};
export const eventSlice = createSlice({
    name: 'event',
    initialState: intitialState,
    reducers: {
        changeToolbar: (state) => {
            state.toolbar = !state.toolbar;
        },
        changeVideoProcessing: (state, action) => {
            state.videoProcessing = action.payload;
        },
    },
});
export const { changeToolbar, changeVideoProcessing } = eventSlice.actions;

export const selectToolbar = (state: RootState) => state.event.toolbar;
export const selectVideoProcessing = (state: RootState) => state.event.videoProcessing;
