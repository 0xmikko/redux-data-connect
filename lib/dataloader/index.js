"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDetailsItem(data, id) {
    if (!data || !data.data[id])
        return undefined;
    return data.data[id];
}
exports.getDetailsItem = getDetailsItem;
