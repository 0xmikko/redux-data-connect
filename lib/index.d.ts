import { AuthStateType } from "./auth";
export declare type STATUS = "STATUS.LOADING" | "STATUS.UPDATING" | "STATUS.SUCCESS" | "STATUS.FAILURE";
export interface DataConnectRootStateI {
    auth: AuthStateType;
}
export declare type DataItem<T> = {
    data?: T;
    status: STATUS;
};
export declare type DataObjectWithID = {
    id: string;
};
export declare const LIST_REQUEST = "LIST_REQUEST";
export declare const LIST_UPDATE = "LIST_UPDATE";
export declare const LIST_SUCCESS = "LIST_SUCCESS";
export declare const LIST_FAILURE = "LIST_FAILURE";
export declare const DETAIL_REQUEST = "DETAIL_REQUEST";
export declare const DETAIL_UPDATE = "DETAIL_UPDATE";
export declare const DETAIL_SUCCESS = "DETAIL_SUCCESS";
export declare const DETAIL_FAILURE = "DETAIL_FAILURE";
export declare const UPLOAD_REQUEST = "UPLOAD_REQUEST";
export declare const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export declare const UPLOAD_FAILURE = "UPLOAD_FAILURE";
