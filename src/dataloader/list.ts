/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { DataLoaderListActions } from "./types";
import {
  STATUS,
  DataObjectWithID,
  LIST_REQUEST,
  LIST_SUCCESS,
  LIST_FAILURE,
} from "..";

export type DataLoaderListState<T> = {
  data: Array<T>;
  error?: boolean;
  status: STATUS;
};

export function createDataLoaderListReducer<T extends DataObjectWithID>(
  prefix: string = ""
) {
  const initialState: DataLoaderListState<T> = {
    data: [],
    error: undefined,
    status: "STATUS.LOADING",
  };

  return function (
    state: DataLoaderListState<T> = initialState,
    action: DataLoaderListActions<T>
  ): DataLoaderListState<T> {
    switch (action.type) {
      case prefix + LIST_REQUEST:
        return { ...state, status: "STATUS.LOADING" };

      case prefix + LIST_SUCCESS:
        return {
          ...state,
          data: action.payload ? action.payload : [],
          status: "STATUS.SUCCESS",
        };

      case prefix + LIST_FAILURE:
        return {
          ...state,
          data: [],
          status: "STATUS.FAILURE",
          error: action ? action.error : false,
        };

      default:
        return state;
    }
  };
}
