import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface ModalState {
    statusKeywordEdit: boolean;
}

export const initialState: ModalState = {
    statusKeywordEdit: false,
};
const modalStateSlice = createSlice({
    name: 'modalState',
    initialState,
    reducers: {
        modalKeywordEditToggled(state, action: PayloadAction<boolean>) {
            state.statusKeywordEdit = action.payload;
        },
    },
});

export const { modalKeywordEditToggled } = modalStateSlice.actions;
export default modalStateSlice.reducer;