"use strict";
/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const details_1 = require("../dataloader/details");
exports.operationReducer = details_1.createDataLoaderDetailsReducer(_1.OPERATION_PREFIX);
