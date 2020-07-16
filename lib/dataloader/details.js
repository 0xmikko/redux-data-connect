"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function createDataLoaderDetailsReducer(prefix = '') {
    const initialState = {
        data: {},
        hashes: {},
    };
    return function (state = initialState, action) {
        const updateDetailState = (state, id, hash, newData) => ({
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
            case prefix + __1.DETAIL_REQUEST:
                return updateDetailState(state, id, hash, { status: "STATUS.LOADING" });
            case prefix + __1.UPLOAD_REQUEST:
                return updateDetailState(state, id, hash, {
                    ...state.data[id],
                    status: "STATUS.UPDATING",
                });
            case prefix + __1.DETAIL_SUCCESS:
            case prefix + __1.UPLOAD_SUCCESS:
                return updateDetailState(state, id, hash, {
                    data: action.payload,
                    status: "STATUS.SUCCESS",
                });
            case prefix + __1.DETAIL_FAILURE:
            case prefix + __1.UPLOAD_FAILURE:
                return updateDetailState(state, id, hash, {
                    data: undefined,
                    status: "STATUS.FAILURE",
                });
            default:
                return state;
        }
    };
}
exports.createDataLoaderDetailsReducer = createDataLoaderDetailsReducer;
