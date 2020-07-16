import { DataItem } from "..";
export declare function getDetailsItem<T>(data: DataLoaderDetailsState<T>, id: string): DataItem<T> | undefined;
export interface DataLoaderDetailsState<T> {
    data: Record<string, DataItem<T>>;
    hashes: Record<string, DataItem<T>>;
}
