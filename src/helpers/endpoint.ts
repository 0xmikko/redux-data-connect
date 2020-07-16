
export const formattUrl = (
    url: string,
    params?: {[P in keyof string]: string[P]},
  ) => {
    // Decode URI if it was in %% format, it's important
    // when we receive next_url in pagination
    url = decodeURI(url);
    let pos = 0;
    if (params !== undefined) {
      for (let key in params) {
        let value = params[key];
        if (value) {
          url += (pos === 0 ? '?' : '&') + key + '=' + value;
          pos++;
        }
      }
    }
    return url;
  };
  
  export const formatUrlWithId = (
    api: string,
    id?: string,
    params?: {[P in keyof string]: string[P]},
  ) => {
    if (id !== undefined) {
      api = api.replace(':id', id);
    }
  
    api += !api.endsWith('/') ? '/' : '';
    return formattUrl(api, params);
  };
  