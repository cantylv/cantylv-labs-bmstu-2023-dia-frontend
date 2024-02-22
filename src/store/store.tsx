import { combineReducers, configureStore } from '@reduxjs/toolkit';
import BidFiltersReducer from './slices/bidFiltersSlice';
import AuthorizationReducer from './slices/authSlice';
import DraftReducer from './slices/draftSlice';
import ServiceFiltersReducer from './slices/serviceFiltersSlice';

export const store = configureStore({
  reducer: combineReducers({
    bidFilter: BidFiltersReducer,  // состояние фильтров на странице списка заявок
    serviceFilter: ServiceFiltersReducer,  // состояние фильтров на странице списка услуг
    authState: AuthorizationReducer,  // состояние пользователя (авторизован или нет, модератор или обычный пользователь)
    draftState: DraftReducer,  // состояние черновика 
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

