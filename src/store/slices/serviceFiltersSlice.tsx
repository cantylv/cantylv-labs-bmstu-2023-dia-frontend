import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { initialStateServiceFilterData } from '../../initialData';

const serviceFiltersSlice = createSlice({
  name: 'serviceFilter',
  initialState: initialStateServiceFilterData,
  reducers: {
    changeSearchText(state, action) {
      state.searchText = action.payload;
    },
    changeDateStart(state, action) {
      state.dateStart = action.payload;
    },
    changeDateEnd(state, action) {
      state.dateEnd = action.payload;
    },
    changeSalaryStart(state, action) {
      state.salaryStart = action.payload;
    },
    changeSalaryEnd(state, action) {
      state.salaryEnd = action.payload;
    },
    clearFilters(state) {
      state.searchText = '';
      state.dateStart = '';
      state.dateEnd = '';
      state.salaryStart = 0;
      state.salaryEnd = 0;
    },
  },
});

export const {
  changeSearchText,
  changeDateStart,
  changeDateEnd,
  changeSalaryStart,
  changeSalaryEnd,
  clearFilters,
} = serviceFiltersSlice.actions;

export const useSearchText = () =>
  useSelector((state: RootState) => state.serviceFilter.searchText);

export const useDateStart = () =>
  useSelector((state: RootState) => state.serviceFilter.dateStart);

export const useDateEnd = () =>
  useSelector((state: RootState) => state.serviceFilter.dateEnd);

export const useSalaryStart = () =>
  useSelector((state: RootState) => state.serviceFilter.salaryStart);

export const useSalaryEnd = () =>
  useSelector((state: RootState) => state.serviceFilter.salaryEnd);

export default serviceFiltersSlice.reducer;
