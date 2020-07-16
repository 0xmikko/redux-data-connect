export declare type DataLoaderListActions<T> = {
    type: string;
    payload?: [T];
    error?: boolean;
};
export declare type DataLoaderDetailsActions<T> = {
    type: string;
    payload?: T;
    meta: {
        id: string;
        hash: string;
    };
    error?: boolean;
};
