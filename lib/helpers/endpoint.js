"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formattUrl = (url, params) => {
    // Decode URI if it was in %% format, it's important
    // when we receive next_url in pagination
    url = decodeURI(url);
    let pos = 0;
    if (params !== undefined) {
        for (let key in params) {
            let value = params[key];
            if (value) {
                url += (pos === 0 ? '?' : '&') + key + '=' + value;
                pos++;
            }
        }
    }
    return url;
};
exports.formatUrlWithId = (api, id, params) => {
    if (id !== undefined) {
        api = api.replace(':id', id);
    }
    api += !api.endsWith('/') ? '/' : '';
    return exports.formattUrl(api, params);
};
