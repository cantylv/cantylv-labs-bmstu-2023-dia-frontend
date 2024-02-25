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
    clearDraft(state) {
      state.services = [];
      state.servicesId = [];
      state.draftId = 0;
    },
  },
});

export const useDraftId = () =>
  useSelector((state: RootState) => state.draftState.draftId);

export const useDraftServices = () =>
  useSelector((state: RootState) => state.draftState.services);

export const useServicesId = () =>
  useSelector((state: RootState) => state.draftState.servicesId);

export const {
  addDraft,
  clearDraft,
  updateDraftId,
  updateDraftServices,
  updateServicesId,
} = draftSlice.actions;
export default draftSlice.reducer;
