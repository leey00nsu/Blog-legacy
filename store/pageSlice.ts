import { HYDRATE } from "next-redux-wrapper";
import { createSlice } from "@reduxjs/toolkit";

interface PageState {
  isAdjust: string;
}

const initialState: PageState = {
  isAdjust: "false",
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setIsAdjust: (state, action) => {
      state.isAdjust = action.payload.status;
    },
  },

  /** 페이지 이동 시 상태 초기화가 필요한 경우 추가해야 함 */
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        // ...action.payload.counter
      };
    },
  },
});

const { actions, reducer: pageReducer } = pageSlice;

export const { setIsAdjust } = actions;

export default pageReducer;
