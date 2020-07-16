"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const redux_api_middleware_1 = require("redux-api-middleware");
const actions_1 = require("../operations/actions");
const auth_1 = require("../auth");
const __1 = require("..");
const endpoint_1 = require("../helpers/endpoint");
exports.createDataLoaderListActions = (endpoint, actionPrefix) => {
    return (hash = "0") => {
        return actions_1.journaledOperation(redux_api_middleware_1.createAction({
            endpoint: endpoint,
            method: "GET",
            headers: auth_1.withAuth({ "Content-Type": "application/json" }),
            types: [
                actionPrefix + __1.LIST_REQUEST,
                actionPrefix + __1.LIST_SUCCESS,
                actionPrefix + __1.LIST_FAILURE,
            ],
        }), hash);
    };
};
exports.createDataLoaderDetailActions = (endpoint, actionPrefix) => (id, hash = "0") => {
    return actions_1.journaledOperation(redux_api_middleware_1.createAction({
        endpoint: endpoint_1.formatUrlWithId(endpoint, id),
        method: "GET",
        headers: auth_1.withAuth({ "Content-Type": "application/json" }),
        types: [
            {
                type: actionPrefix + __1.DETAIL_REQUEST,
                meta: { id },
            },
            {
                type: actionPrefix + __1.DETAIL_SUCCESS,
                meta: { id },
            },
            {
                type: actionPrefix + __1.DETAIL_FAILURE,
                meta: { id },
            },
        ],
    }), hash);
};
exports.createDataLoaderCreateUpdateDataAction = (apiCreate, apiUpdate, actionPrefix) => (id, data, hash = "0") => {
    if (id === undefined) {
        throw new Error(`No id was provided for opeation: #${hash}`);
    }
    const endpoint = id.startsWith("new")
        ? endpoint_1.formatUrlWithId(apiCreate)
        : endpoint_1.formatUrlWithId(apiUpdate, id);
    const method = id.startsWith("new") ? "POST" : "PUT";
    return actions_1.journaledOperation(redux_api_middleware_1.createAction({
        endpoint,
        method,
        headers: auth_1.withAuth({ "Content-Type": "application/json" }),
        body: JSON.stringify(data),
        types: [
            {
                type: actionPrefix + __1.UPLOAD_REQUEST,
                meta: { id },
            },
            {
                type: actionPrefix + __1.UPLOAD_SUCCESS,
                meta: { id },
            },
            {
                type: actionPrefix + __1.UPLOAD_FAILURE,
                meta: { id },
            },
        ],
    }), hash);
};
exports.createDataLoaderUploadFileAction = (api, actionPrefix) => (id, file, hash = "0") => {
    const body = new FormData();
    body.append("file", file);
    return actions_1.journaledOperation(redux_api_middleware_1.createAction({
        endpoint: endpoint_1.formatUrlWithId(api, id),
        method: "POST",
        headers: auth_1.withAuth({}),
        body,
        types: [
            {
                type: actionPrefix + __1.UPLOAD_REQUEST,
                meta: { id },
            },
            {
                type: actionPrefix + __1.UPLOAD_SUCCESS,
                meta: { id },
            },
            {
                type: actionPrefix + __1.UPLOAD_FAILURE,
                meta: { id },
            },
        ],
    }), hash);
};
