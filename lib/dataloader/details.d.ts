import { DataLoaderDetailsState } from './index';
import { DataLoaderDetailsActions } from './types';
import { DataObjectWithID } from '..';
export declare function createDataLoaderDetailsReducer<T extends DataObjectWithID>(prefix?: string): (state: DataLoaderDetailsState<T> | undefined, action: DataLoaderDetailsActions<T>) => DataLoaderDetailsState<T>;
