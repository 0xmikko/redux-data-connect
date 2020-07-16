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
import { ThunkAction } from "redux-thunk";
import { createAction } from "redux-api-middleware";

import { journaledOperation } from "../operations/actions";
import { withAuth } from "../auth";
import {
  DataConnectRootStateI,
  LIST_REQUEST,
  LIST_SUCCESS,
  LIST_FAILURE,
  DETAIL_FAILURE,
  DETAIL_REQUEST,
  DETAIL_SUCCESS,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
} from "..";
import { formatUrlWithId } from "../helpers/endpoint";

export const createDataLoaderListActions = (
  endpoint: string,
  actionPrefix: string
) => {
  
  return (
    hash: string = "0"
  ): ThunkAction<void, DataConnectRootStateI, unknown, Action<string>> => {
    return journaledOperation(
      createAction({
        endpoint: endpoint,
        method: "GET",
        headers: withAuth({ "Content-Type": "application/json" }),
        types: [
          actionPrefix + LIST_REQUEST,
          actionPrefix + LIST_SUCCESS,
          actionPrefix + LIST_FAILURE,
        ],
      }),
      hash
    );
  };
};

export const createDataLoaderDetailActions = (
  endpoint: string,
  actionPrefix: string
) => (
  id: string,
  hash: string = "0"
): ThunkAction<void, DataConnectRootStateI, unknown, Action<string>> => {
  return journaledOperation(
    createAction({
      endpoint: formatUrlWithId(endpoint, id),
      method: "GET",
      headers: withAuth({ "Content-Type": "application/json" }),
      types: [
        {
          type: actionPrefix + DETAIL_REQUEST,
          meta: { id },
        },
        {
          type: actionPrefix + DETAIL_SUCCESS,
          meta: { id },
        },
        {
          type: actionPrefix + DETAIL_FAILURE,
          meta: { id },
        },
      ],
    }),
    hash
  );
};

export const createDataLoaderCreateUpdateDataAction = <T>(
  apiCreate: string,
  apiUpdate: string,
  actionPrefix: string
) => (
  id: string,
  data: T,
  hash: string = "0"
): ThunkAction<void, DataConnectRootStateI, unknown, Action<string>> => {
  if (id === undefined) {
    throw new Error(`No id was provided for opeation: #${hash}`);
  }

  const endpoint = id.startsWith("new")
    ? formatUrlWithId(apiCreate)
    : formatUrlWithId(apiUpdate, id);

  const method = id.startsWith("new") ? "POST" : "PUT";
  return journaledOperation(
    createAction({
      endpoint,
      method,
      headers: withAuth({ "Content-Type": "application/json" }),
      body: JSON.stringify(data),
      types: [
        {
          type: actionPrefix + UPLOAD_REQUEST,
          meta: { id },
        },
        {
          type: actionPrefix + UPLOAD_SUCCESS,
          meta: { id },
        },
        {
          type: actionPrefix + UPLOAD_FAILURE,
          meta: { id },
        },
      ],
    }),
    hash
  );
};

export const createDataLoaderUploadFileAction = (
  api: string,
  actionPrefix: string
) => (
  id: string,
  file: File,
  hash: string = "0"
): ThunkAction<void, DataConnectRootStateI, unknown, Action<string>> => {
  const body = new FormData();
  body.append("file", file);

  return journaledOperation(
    createAction({
      endpoint: formatUrlWithId(api, id),
      method: "POST",
      headers: withAuth({}),
      body,
      types: [
        {
          type: actionPrefix + UPLOAD_REQUEST,
          meta: { id },
        },
        {
          type: actionPrefix + UPLOAD_SUCCESS,
          meta: { id },
        },
        {
          type: actionPrefix + UPLOAD_FAILURE,
          meta: { id },
        },
      ],
    }),
    hash
  );
};
