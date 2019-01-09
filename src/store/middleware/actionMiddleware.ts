import { Middleware } from "redux";

const actionMiddleware: Middleware = () => next => (action: any) => {
  return next({ payload: {}, error: false, meta: {}, ...action });
};

export default actionMiddleware;
