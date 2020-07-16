/**
 * Copyright 2020 Mikael Lazarev
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Action } from "redux";
import { namespace, OPERATION_PREFIX } from "./index";
import { ThunkAction } from "redux-thunk";
import {
  RSAAAction,
  RSAAResultAction,
  InternalError,
  RequestError,
  ApiError,
} from "redux-api-middleware";
import { STATUS, DataConnectRootStateI, DETAIL_SUCCESS } from "..";

export const journaledOperation = (
  action: RSAAAction<any, any, any>,
  opHash: string
): ThunkAction<
  Promise<RSAAResultAction<any, any>>,
  DataConnectRootStateI,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch(updateStatus(opHash || "0", "STATUS.LOADING"));
  const result = await dispatch(action);
  if (result === undefined || result.error) {
    if (result instanceof InternalError || result instanceof RequestError) {
      dispatch(updateStatus(opHash || "0", "STATUS.FAILURE", result.message));
    } else if (result instanceof ApiError) {
      dispatch(updateStatus(opHash || "0", "STATUS.FAILURE", result.message));
    } else {
      dispatch(updateStatus(opHash || "0", "STATUS.FAILURE", "Network error"));
    }
  } else dispatch(updateStatus(opHash || "0", "STATUS.SUCCESS"));
  return result;
};
export const updateStatus = (
  opHash: string,
  status: STATUS,
  error?: string
) => ({
  type: OPERATION_PREFIX + DETAIL_SUCCESS,
  payload: {
    id: opHash,
    status,
    error,
  },
});

export const connectSocket = (): ThunkAction<
  void,
  DataConnectRootStateI,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({
    type: "SOCKET_ON",
    namespace,
    event: "operations:update",
    typeOnSuccess: OPERATION_PREFIX + DETAIL_SUCCESS,
  });
};

declare module "redux-thunk" {
  /*
   * Overload to add api middleware support to Redux's dispatch() function.
   * Useful for react-redux or any other library which could use this type.
   */

  interface ThunkDispatch<S, E, A extends Action> {
    <T extends A>(action: T): T;
    <R>(asyncAction: ThunkAction<R, S, E, A>): R;
    <Payload, Meta>(action: RSAAAction<any, Payload, Meta>): Promise<
      RSAAResultAction<Payload, Meta>
    >;
  }
}
