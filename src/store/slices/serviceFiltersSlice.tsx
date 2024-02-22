import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const initialState = {
  searchText: '',
  dateStart: '',
  dateEnd: '',
  salaryStart: 0,
  salaryEnd: 0,
};

const serviceFiltersSlice = createSlice({
  name: 'serviceFilter',
  initialState: initialState,
  reducers: {
    changeSearchText(state, action) {
      state.searchText = action.payload.searchText;
    },
    changeDateStart(state, action) {
      state.dateStart = action.payload.dateStart;
    },
    changeDateEnd(state, action) {
      state.dateEnd = action.payload.dateEnd;
    },
    changeSalaryStart(state, action) {
      state.salaryStart = action.payload.salaryStart;
    },
    changeSalaryEnd(state, action) {
      state.salaryEnd = action.payload.salaryEnd;
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
