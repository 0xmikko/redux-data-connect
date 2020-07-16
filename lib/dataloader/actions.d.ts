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
import { DataConnectRootStateI } from "..";
export declare const createDataLoaderListActions: (endpoint: string, actionPrefix: string) => (hash?: string) => ThunkAction<void, DataConnectRootStateI, unknown, Action<string>>;
export declare const createDataLoaderDetailActions: (endpoint: string, actionPrefix: string) => (id: string, hash?: string) => ThunkAction<void, DataConnectRootStateI, unknown, Action<string>>;
export declare const createDataLoaderCreateUpdateDataAction: <T>(apiCreate: string, apiUpdate: string, actionPrefix: string) => (id: string, data: T, hash?: string) => ThunkAction<void, DataConnectRootStateI, unknown, Action<string>>;
export declare const createDataLoaderUploadFileAction: (api: string, actionPrefix: string) => (id: string, file: File, hash?: string) => ThunkAction<void, DataConnectRootStateI, unknown, Action<string>>;
