import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { initialStateDraftData } from '../../initialData';


const draftSlice = createSlice({
  name: 'draft',
  initialState: initialStateDraftData,
  reducers: {
    addDraft(state, { payload }) {
      state.services = payload.services;
      state.servicesId = payload.countServices;
      state.draftId = payload.draftId;
    },
    updateDraftId(state, action) {
      state.draftId = action.payload;
    },
    updateDraftServices(state, action) {
      state.draftId = action.payload;
    },
    updateServicesId(state, action) {
      state.draftId = action.payload;
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
