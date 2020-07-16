"use strict";
/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */
Object.defineProperty(exports, "__esModule", { value: true });
function accessToken(state) {
    return state.auth?.access?.token;
}
exports.accessToken = accessToken;
function isAccessTokenExpired(state) {
    if (state.auth.access && state.auth.access.exp) {
        return 1000 * state.auth.access.exp - new Date().getTime() < 5000;
    }
    return true;
}
exports.isAccessTokenExpired = isAccessTokenExpired;
function refreshToken(state) {
    return state.auth?.refresh?.token;
}
exports.refreshToken = refreshToken;
function isRefreshTokenExpired(state) {
    if (state.auth.refresh && state.auth.refresh.exp) {
        return 1000 * state.auth.refresh.exp - new Date().getTime() < 5000;
    }
    return true;
}
exports.isRefreshTokenExpired = isRefreshTokenExpired;
function isAuthenticated(state) {
    return !isRefreshTokenExpired(state);
}
exports.isAuthenticated = isAuthenticated;
function withAuth(headers = {}) {
    return (state) => ({
        ...headers,
        Authorization: `Bearer ${accessToken(state)}`,
    });
}
exports.withAuth = withAuth;
