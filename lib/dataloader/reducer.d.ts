import { DataObjectWithID } from '..';
export declare function createDataLoaderReducer<T extends DataObjectWithID>(prefix?: string): import("redux").Reducer<import("redux").CombinedState<{
    List: import("./list").DataLoaderListState<T>;
    Details: import(".").DataLoaderDetailsState<T>;
}>, import("./types").DataLoaderListActions<T> | import("./types").DataLoaderDetailsActions<T>>;
