import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AuthState} from '../../types/types';

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

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dptmvt8xi/image/upload',
        {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to upload image');
      }

      return data.secure_url;
    } catch (error: any) {
      return rejectWithValue(error.message);
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
