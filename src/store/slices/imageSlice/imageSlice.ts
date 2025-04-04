import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AuthState} from '../../../types/types';
import axios from 'axios';

export const uploadToCloudinary = createAsyncThunk(
  'transaction/uploadToCloudinary',
  async (imageUri: string, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'upload.jpg',
      });
      formData.append('upload_preset', 'picture');
      formData.append('cloud_name', 'dptmvt8xi');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dptmvt8xi/image/upload',
        formData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return response.data.secure_url;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: <AuthState>{
    loading: false,
    error: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder;
    builder.addCase(uploadToCloudinary.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadToCloudinary.fulfilled, (state, action) => {
      state.loading = false;
      state.status = 'succeeded';
    });
    builder.addCase(uploadToCloudinary.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.status = 'failed';
    });
  },
});

export default authSlice.reducer;
