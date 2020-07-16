import { AnyAction, Dispatch } from "redux";
export declare function createApiMiddleware(refreshEndpoint: string): ({ dispatch, getState, }: {
    dispatch: any;
    getState: any;
}) => (next: Dispatch<AnyAction>) => (action: AnyAction) => any | undefined;
