/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import { AnyAction, Dispatch } from "redux";
import { apiMiddleware, isRSAA } from "redux-api-middleware";
import { isAccessTokenExpired, refreshToken } from "./auth";
import { refreshAccessToken } from "./auth/actions";

export function createApiMiddleware(
  refreshEndpoint: string
): ({
  dispatch,
  getState,
}: {
  dispatch: any;
  getState: any;
}) => (next: Dispatch<AnyAction>) => (action: AnyAction) => any | undefined {
  let postponedRSAAs: AnyAction[] = [];

  return ({ dispatch, getState }) => {
    const rsaaMiddleware = apiMiddleware({ dispatch, getState });

    return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
      const nextCheckPostoned = (nextAction: AnyAction) => {
        // Run postponed actions after token refresh
        if (nextAction.type === "AUTH_REFRESH_SUCCESS") {
          next(nextAction);
          postponedRSAAs.forEach((postponed) => {
            rsaaMiddleware(next)(postponed);
          });
          postponedRSAAs = [];
        } else {
          next(nextAction);
        }
      };

      if (isRSAA(action)) {
        const state = getState(),
          token = refreshToken(state);

        if (token && isAccessTokenExpired(state)) {
          postponedRSAAs.push(action);
          if (postponedRSAAs.length === 1) {
            return rsaaMiddleware(dispatch(nextCheckPostoned))(
              refreshAccessToken(refreshEndpoint, token)
            );
          } else {
            return;
          }
        }

        return rsaaMiddleware(next)(action);
      }
      return next(action);
    };
  };
}
