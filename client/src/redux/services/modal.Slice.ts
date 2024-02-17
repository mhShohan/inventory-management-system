import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IProduct } from '../../types/product.types';


interface InitialState {
  updateModel: { open: boolean, data: null | IProduct },
  createVariantModel: { open: boolean, data: null | IProduct },
  saleModel: { open: boolean, data: null | { _id: string, price: number, name: string } },
  bulkDelete: string[]
}

const initialState: InitialState = {
  updateModel: { open: false, data: null },
  createVariantModel: { open: false, data: null },
  saleModel: { open: false, data: null },
  bulkDelete: []
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleUpdateModel: (state, action: PayloadAction<{ open: boolean, data: null | IProduct }>) => {
      state.updateModel.open = action.payload.open
      state.updateModel.data = action.payload.data
    },
    toggleCreateVariantModel: (state, action: PayloadAction<{ open: boolean, data: null | IProduct }>) => {
      state.createVariantModel.open = action.payload.open
      state.createVariantModel.data = action.payload.data
    },
    toggleSaleModel: (state, action: PayloadAction<{ open: boolean, data: null | { _id: string, price: number, name: string } }>) => {
      state.saleModel.open = action.payload.open
      state.saleModel.data = action.payload.data
    },
    addToBulkDelete: (state, action: PayloadAction<string>) => {
      state.bulkDelete.push(action.payload)
    },
    addAllToBulkDelete: (state, action: PayloadAction<string[]>) => {
      state.bulkDelete = action.payload
    },
    removeToBulkDelete: (state, action: PayloadAction<string>) => {
      state.bulkDelete = state.bulkDelete.filter(item => item !== action.payload)
    },
    removeAllToBulkDelete: (state) => {
      state.bulkDelete = []
    },
  }
});

export const {
  toggleSaleModel,
  toggleUpdateModel,
  toggleCreateVariantModel,
  addToBulkDelete,
  removeToBulkDelete,
  addAllToBulkDelete,
  removeAllToBulkDelete } = modalSlice.actions

export default modalSlice.reducer;

export const getUpdateModal = (state: RootState) => state.modal.updateModel.open
export const getUpdateModalData = (state: RootState) => state.modal.updateModel.data
export const getSaleModal = (state: RootState) => state.modal.saleModel.open
export const getSaleModalData = (state: RootState) => state.modal.saleModel.data
export const getCreateVariantModel = (state: RootState) => state.modal.createVariantModel.open
export const getCreateVariantModelData = (state: RootState) => state.modal.createVariantModel.data
export const getBulkDelete = (state: RootState) => state.modal.bulkDelete
