"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_api_middleware_1 = require("redux-api-middleware");
const auth_1 = require("./auth");
const actions_1 = require("./auth/actions");
function createApiMiddleware(refreshEndpoint) {
    let postponedRSAAs = [];
    return ({ dispatch, getState }) => {
        const rsaaMiddleware = redux_api_middleware_1.apiMiddleware({ dispatch, getState });
        return (next) => (action) => {
            const nextCheckPostoned = (nextAction) => {
                // Run postponed actions after token refresh
                if (nextAction.type === "AUTH_REFRESH_SUCCESS") {
                    next(nextAction);
                    postponedRSAAs.forEach((postponed) => {
                        rsaaMiddleware(next)(postponed);
                    });
                    postponedRSAAs = [];
                }
                else {
                    next(nextAction);
                }
            };
            if (redux_api_middleware_1.isRSAA(action)) {
                const state = getState(), token = auth_1.refreshToken(state);
                if (token && auth_1.isAccessTokenExpired(state)) {
                    postponedRSAAs.push(action);
                    if (postponedRSAAs.length === 1) {
                        return rsaaMiddleware(dispatch(nextCheckPostoned))(actions_1.refreshAccessToken(refreshEndpoint, token));
                    }
                    else {
                        return;
                    }
                }
                return rsaaMiddleware(next)(action);
            }
            return next(action);
        };
    };
}
exports.createApiMiddleware = createApiMiddleware;
