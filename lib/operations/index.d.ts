import { STATUS } from "..";
export interface Operation {
    id: string;
    status: STATUS;
    error?: string;
}
export declare const namespace = "operations";
export declare const OPERATION_PREFIX = "OPERATIONS@@";
