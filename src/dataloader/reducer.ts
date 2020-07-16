/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {combineReducers} from 'redux';
import {createDataLoaderListReducer} from './list';
import {createDataLoaderDetailsReducer} from './details';
import { DataObjectWithID } from '..';


export function createDataLoaderReducer<T extends DataObjectWithID>(
  prefix: string = '',
) {
  return combineReducers({
    List: createDataLoaderListReducer<T>(prefix),
    Details: createDataLoaderDetailsReducer<T>(prefix),
  });
}
