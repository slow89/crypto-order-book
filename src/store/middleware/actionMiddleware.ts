import { Middleware } from "redux";

const actionMiddleware: Middleware = () => next => (action: any) => {
  return next({ payload: {}, ...action });
};

export default actionMiddleware;
