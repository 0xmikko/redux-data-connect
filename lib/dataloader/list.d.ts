import { DataLoaderListActions } from "./types";
import { STATUS, DataObjectWithID } from "..";
export declare type DataLoaderListState<T> = {
    data: Array<T>;
    error?: boolean;
    status: STATUS;
};
export declare function createDataLoaderListReducer<T extends DataObjectWithID>(prefix?: string): (state: DataLoaderListState<T> | undefined, action: DataLoaderListActions<T>) => DataLoaderListState<T>;
