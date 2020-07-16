import { DataItem } from "..";


export function getDetailsItem<T>(
  data: DataLoaderDetailsState<T>,
  id: string
): DataItem<T> | undefined {
  if (!data || !data.data[id]) return undefined;
  return data.data[id];
}

export interface DataLoaderDetailsState<T> {
  data: Record<string, DataItem<T>>;
  hashes: Record<string, DataItem<T>>;
}
