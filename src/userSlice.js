import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set_user: (state, action) => {
            // return { ...state, userData: [...state.userData, action.payload] };
            state.userData = [...state.userData, action.payload];
        },

        delete_user: (state, action) => {
            // return { ...state, userData: [...state.userData.splice(0, action.payload), ...state.userData.splice(1)] };
            state.userData = [...state.userData.splice(0, action.payload), ...state.userData.splice(1)]
        },
        delete_selected_user: (state, action) => {
            let currentUserData = state.userData;
            let removeIndex = action.payload;
            let updatedUserData = currentUserData.filter((value, i) => !removeIndex.includes(`${i}`));
            console.log("updatedUserData", updatedUserData)

            // return { ...state, userData: updatedUserData };
            state.userData = updatedUserData;
        },
    },
})
export const { set_user, delete_user, delete_selected_user } = userSlice.actions
export default userSlice.reducer