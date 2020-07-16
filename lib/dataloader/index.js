"use strict";
/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */
Object.defineProperty(exports, "__esModule", { value: true });
function getDetailsItem(data, id) {
    if (!data || !data.data[id])
        return undefined;
    return data.data[id];
}
exports.getDetailsItem = getDetailsItem;
;
