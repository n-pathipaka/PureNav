import {createSlice} from '@reduxjs/toolkit';


// {
//     location: {
//     lat: 37.78825,
//     lng: -122.4324,
//     }
// }

const initialState = {

    user: null,
    placeLocation: null
     
}


export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        SetPlaceLocation: (state, action) => {
            state.placeLocation = action.payload;
        },

        setResponses: (state, action) => {
            state.responses = action.payload;
        }
    }
});   

export const {setUser} = navSlice.actions; 
export const {SetPlaceLocation} = navSlice.actions; 

export const {setResponses} = navSlice.actions;

//selectors
export const selectUser = state => state.nav.user; 
export const selectPlaceLocation = state => state.nav.placeLocation;

export const selectResponses = state => state.nav.responses;

export default navSlice.reducer; 