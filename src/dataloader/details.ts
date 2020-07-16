import { DataLoaderDetailsState } from './index';
/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {DataLoaderDetailsActions} from './types';
import { DataObjectWithID, DataItem, DETAIL_REQUEST, UPLOAD_REQUEST, DETAIL_SUCCESS, UPLOAD_SUCCESS, DETAIL_FAILURE, UPLOAD_FAILURE } from '..';


export function createDataLoaderDetailsReducer<T extends DataObjectWithID>(
  prefix: string = '',
) {
  const initialState: DataLoaderDetailsState<T> = {
    data: {},
    hashes: {},
  };

  return function (
    state: DataLoaderDetailsState<T> = initialState,
    action: DataLoaderDetailsActions<T>,
  ): DataLoaderDetailsState<T> {
    const updateDetailState = (
      state: DataLoaderDetailsState<T>,
      id: string,
      hash: string,
      newData: DataItem<T>,
    ): DataLoaderDetailsState<T> => ({
      ...state,
      data: {
        ...state.data,
        [id]: newData,
      },
      hashes: {
        ...state.hashes,
        [hash]: newData,
      },
    });

    let id = '-';
    if (action.payload !== undefined && action.payload.id !== undefined) {
      id = action.payload.id;
    }
    if (action.meta !== undefined && action.meta.id !== undefined) {
      id = action.meta.id;
    }

    const hash = "";

    switch (action.type) {
      case prefix + DETAIL_REQUEST:
        return updateDetailState(state, id, hash, {status: "STATUS.LOADING"});

      case prefix + UPLOAD_REQUEST:
        return updateDetailState(state, id, hash, {
          ...state.data[id],
          status: "STATUS.UPDATING",
        });

      case prefix + DETAIL_SUCCESS:
      case prefix + UPLOAD_SUCCESS:
        return updateDetailState(state, id, hash, {
          data: action.payload,
          status: "STATUS.SUCCESS",
        });

      case prefix + DETAIL_FAILURE:
      case prefix + UPLOAD_FAILURE:
        return updateDetailState(state, id, hash, {
          data: undefined,
          status: "STATUS.FAILURE",
        });

      default:
        return state;
    }
  };
}
