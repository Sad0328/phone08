import { createSlice, isAnyOf } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { fetchContacts, addContacts, deleteContacts } from './operations';


const getActions = type =>
  isAnyOf(fetchContacts[type], addContacts[type], deleteContacts[type]);

const initialState = { items: [], isLoading: false, error: null };

const contactsSlice = createSlice({
  name: 'contacts', 
  initialState, 
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
       
        state.items = action.payload; 
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        
        state.items.unshift(action.payload); 
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1); 
      })
      .addMatcher(getActions('pending'), state => {
        
        state.isLoading = true; 
      })
      .addMatcher(getActions('rejected'), (state, action) => {
      
        state.isLoading = false; 
        state.error = action.payload; 
      })
      .addMatcher(getActions('fulfilled'), state => {
        
        state.isLoading = false; 
        state.error = null; 
      }),
});


export const { addContact, deleteContact } = contactsSlice.actions;


export const contactsReducer = contactsSlice.reducer;





// const phoneContacts = {
//   items: [
//     { id: 'id-1', name: 'Eva', number: '7654-09-09' },
//     { id: 'id-2', name: 'Adam', number: '0123-45-67' },
//   ],
// };

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: phoneContacts,
//   reducers: {
//     addContact: {
//       reducer(state, action) {
//         state.items.push(action.payload);
//       },
//     },
//     prepare(newContact) {
//       return {
//         payload: { id: nanoid(), ...newContact },
//       };
//     },
//     removeContact(state, action) {
//       const index = state.items.findIndex(
//         contact => contact.id !== action.payload
//       );
//       state.items.splice(index, 1);
//     },
//   },
// });

// export const { addContact, removeContact } = contactsSlice.actions;

// export const contactsReducer = persistReducer(
//   { key: 'contacts', storage },
//   contactsSlice.reducer
// );
