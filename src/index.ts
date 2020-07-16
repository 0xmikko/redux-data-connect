import { AuthStateType } from "./auth";

export type STATUS =
  | "STATUS.LOADING"
  | "STATUS.UPDATING"
  | "STATUS.SUCCESS"
  | "STATUS.FAILURE";

export interface DataConnectRootStateI {
  auth: AuthStateType;
}

export type DataItem<T> = {
  data?: T;
  status: STATUS;
};

export type DataObjectWithID = {
  id: string;
};

export const LIST_REQUEST = "LIST_REQUEST";
export const LIST_UPDATE = "LIST_UPDATE";
export const LIST_SUCCESS = "LIST_SUCCESS";
export const LIST_FAILURE = "LIST_FAILURE";

export const DETAIL_REQUEST = "DETAIL_REQUEST";
export const DETAIL_UPDATE = "DETAIL_UPDATE";
export const DETAIL_SUCCESS = "DETAIL_SUCCESS";
export const DETAIL_FAILURE = "DETAIL_FAILURE";

export const UPLOAD_REQUEST = "UPLOAD_REQUEST";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILURE = "UPLOAD_FAILURE";

//   
