import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface getDataType {
  id: string;
  imgUrl: string;
  title: string;
  type: string;
  size: string;
  count: number;
  price: number;
}

const initialState: Array<getDataType> = [];
export const setSortValue = (value: string) => ({
  type: "SET_SORT_VALUE",
  payload: value,
});

export const OrderProducts = createSlice({
  name: "orderList",
  initialState: initialState,
  reducers: {
    getOrderProducts: (
      state: Array<getDataType>,
      action: PayloadAction<getDataType>
    ) => {
      return [...state, action.payload];
    },
    incOrder: (state: Array<getDataType>, action: PayloadAction<any>) => {
      state.map((item: getDataType) => {
        if (item.id == action.payload) {
          item.count = item.count + 1;
        }
        return item;
      });
    },
    decOrder: (state: Array<getDataType>, action: PayloadAction<any>) => {
      state.map((item: getDataType) => {
        if (item.id == action.payload) {
          item.count = item.count - 1;
        }
        return item;
      });
    },
  },
});

export const { getOrderProducts, decOrder, incOrder } = OrderProducts.actions;
