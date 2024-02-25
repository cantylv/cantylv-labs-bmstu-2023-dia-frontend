import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { initialStateBidFilterData } from '../../initialData';

const bidFiltersSlice = createSlice({
  name: 'bidFilter',
  initialState: initialStateBidFilterData,
  reducers: {
    setBidFilterData(state, action) {
      state.status = action.payload.status;
      state.username = action.payload.username;
      state.dateStart = action.payload.dateStart;
      state.dateEnd = action.payload.dateEnd;
    },
    clearBidFilters(state) {
      state.status = '';
      state.dateStart = '';
      state.dateEnd = '';
      state.username = '';
    },
  },
});

export const useStatus = () =>
  useSelector((state: RootState) => state.bidFilter.status);

export const useDateStart = () =>
  useSelector((state: RootState) => state.bidFilter.dateStart);

export const useDateEnd = () =>
  useSelector((state: RootState) => state.bidFilter.dateEnd);

export const useUsername = () =>
  useSelector((state: RootState) => state.bidFilter.username);

export const {
  setBidFilterData,
  clearBidFilters,
} = bidFiltersSlice.actions;

export default bidFiltersSlice.reducer;
