import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { initialStateDraftData } from '../../initialData';

const draftSlice = createSlice({
  name: 'draft',
  initialState: initialStateDraftData,
  reducers: {
    addDraft(state, action) {
      state.services = action.payload.services;
      state.servicesId = action.payload.servicesId;
      state.draftId = action.payload.draftId;
      state.countServices = action.payload.countServices;
    },
    updateDraftId(state, action) {
      state.draftId = action.payload;
    },
    updateDraftServices(state, action) {
      state.services = action.payload;
    },
    updateServicesId(state, action) {
      state.servicesId = action.payload;
    },
    updateCountServices(state, action) {
      state.countServices = action.payload;
    },
    clearDraft(state) {
      state.services = [];
      state.servicesId = [];
      state.draftId = 0;
      state.countServices = 0;
    },
  },
});

export const useDraftId = () =>
  useSelector((state: RootState) => state.draftState.draftId);

export const useDraftServices = () =>
  useSelector((state: RootState) => state.draftState.services);

export const useServicesId = () =>
  useSelector((state: RootState) => state.draftState.servicesId);

export const useCountServices = () =>
  useSelector((state: RootState) => state.draftState.countServices);

export const {
  addDraft,
  clearDraft,
  updateDraftId,
  updateDraftServices,
  updateServicesId,
  updateCountServices,
} = draftSlice.actions;
export default draftSlice.reducer;
