import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetVideosResponse, VideoSearchParams } from 'shared/types';
import { AxiosResponse } from 'axios';
import { instance } from 'shared/api';

export const videosApi = {
  getVideos({ query = '', sortBy = 'relevance', countResult = 12 }) {
    return instance.get<VideoSearchParams, AxiosResponse<GetVideosResponse>>(
      `/api/query/search?query=${query}&sortBy=${sortBy}&countResult=${countResult}`,
    );
  },
};

export const fetchGetVideos = createAsyncThunk<
  GetVideosResponse,
  VideoSearchParams
>('videos/fetchGetVideos', async ({ query, sortBy, countResult }, thunkApi) => {
  try {
    const { data } = await videosApi.getVideos({ query, sortBy, countResult });
    return data;
  } catch (err) {
    return thunkApi.rejectWithValue('Не удалось загрузить видео :(');
  }
});
