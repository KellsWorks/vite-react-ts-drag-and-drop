import { createAction, createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import localStorage from 'redux-persist/lib/storage';
import { DataResponse, LayoutView, LoadingState, State } from "../types";
import data from '../__data__';
import { RootState } from "./store";

const initialState = {
  views: [],
  components: [],
  loading: {
    state: LoadingState.IDLE
  }
};

/* --------------- Actions ---------------*/
export const fetchData = createAsyncThunk('fetchData', async () => {
  return data;
});

export const setLayoutView = createAction<LayoutView>('setLayoutView')

/* --------------- Selectors ---------------*/
const getViews = (state: RootState) => state.views;
const getComponents = (state: RootState) => state.components;
const getViewById = (id: string | undefined) => (state: RootState) => state.views.find((view: LayoutView) => view.id === id);

export const selectors = {
  getViews,
  getViewById,
  getComponents
}

/* --------------- Reducer ---------------*/
const fetchDataPendingReducer = (state: any) => {
  state.loading = { state: LoadingState.REQUEST };
};

const fetchDataFulfilledReducer = (state: any, action: PayloadAction<DataResponse>) => {
  state.views = action.payload.views;
  state.components = action.payload.components;
  state.loading = { state: LoadingState.SUCCESS };
};

const fetchDataRejectedReducer = (state: any, action: PayloadAction<any>) => {
  state.views = [];
  state.loading = {
    state: LoadingState.FAILURE,
    error: action.payload,
  };
};

const setLayoutViewReducer = (state: any, action: PayloadAction<LayoutView>) => {
  const view = state.views.find((view: LayoutView) => view.id === action.payload.id);
  if (view) {
    view.componentLayout = action.payload.componentLayout;
  }
};

const slice: Slice<State, any> = createSlice<State, any>({
  name: "views",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, fetchDataPendingReducer)
    builder.addCase(fetchData.fulfilled, fetchDataFulfilledReducer)
    builder.addCase(fetchData.rejected, fetchDataRejectedReducer)
    builder.addCase(setLayoutView.type, setLayoutViewReducer)
  },
});

const persistConfig = {
  key: 'views',
  storage: localStorage,
  whitelist: ['views', 'components']
}

export default persistReducer(persistConfig, slice.reducer);
