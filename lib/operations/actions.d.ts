/**
 * Copyright 2020 Mikael Lazarev
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RSAAAction, RSAAResultAction } from "redux-api-middleware";
import { STATUS, DataConnectRootStateI } from "..";
export declare const journaledOperation: (action: RSAAAction<any, any, any>, opHash: string) => ThunkAction<Promise<RSAAResultAction<any, any>>, DataConnectRootStateI, unknown, Action<string>>;
export declare const updateStatus: (opHash: string, status: STATUS, error?: string | undefined) => {
    type: string;
    payload: {
        id: string;
        status: STATUS;
        error: string | undefined;
    };
};
export declare const connectSocket: () => ThunkAction<void, DataConnectRootStateI, unknown, Action<string>>;
declare module "redux-thunk" {
    interface ThunkDispatch<S, E, A extends Action> {
        <T extends A>(action: T): T;
        <R>(asyncAction: ThunkAction<R, S, E, A>): R;
        <Payload, Meta>(action: RSAAAction<any, Payload, Meta>): Promise<RSAAResultAction<Payload, Meta>>;
    }
}
