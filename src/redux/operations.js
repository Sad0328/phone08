import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


axios.defaults.baseURL = 'https://65cf3099bdb50d5e5f5ab042.mockapi.io';


export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll', 
  async (_, thunkAPI) => {
    try {
     
      const response = await axios.get('/contacts');
     
      return response.data;
    } catch (error) {
      
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const addContacts = createAsyncThunk(
  'contacts/addContacts', 
  async ({ name, number }, thunkAPI) => {
    try {
      
      const response = await axios.post('/contacts', { name, number });
      
      return response.data;
    } catch (error) {
      
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'contacts/deleteContacts', 
  async (contactId, thunkAPI) => {
    try {
      
      const response = await axios.delete(`/contacts/${contactId}`);
     
      return response.data;
    } catch (error) {
      
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
