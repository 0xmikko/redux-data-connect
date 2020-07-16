"use strict";
/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const list_1 = require("./list");
const details_1 = require("./details");
function createDataLoaderReducer(prefix = '') {
    return redux_1.combineReducers({
        List: list_1.createDataLoaderListReducer(prefix),
        Details: details_1.createDataLoaderDetailsReducer(prefix),
    });
}
exports.createDataLoaderReducer = createDataLoaderReducer;
