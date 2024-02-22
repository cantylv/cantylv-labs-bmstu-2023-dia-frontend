import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

const draftSlice = createSlice({
  name: 'draft',
  initialState: {
    draftId: 0,
    services: [],
    servicesId: [],
  },
  reducers: {
    addDraft(state, { payload }) {
      state.services = payload.services;
      state.servicesId = payload.countServices;
      state.draftId = payload.draftId;
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

export const { addDraft, clearDraft } = draftSlice.actions;
export default draftSlice.reducer;
