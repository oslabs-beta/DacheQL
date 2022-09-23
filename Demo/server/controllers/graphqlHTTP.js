
export function graphqlHTTPCache(customHeaders) {
  const defaultHeaders = {
    'Cache-Control': 'max-age=5',
  };

  const finalHeaders = { ...defaultHeaders, ...customHeaders };

  return function setHeaders(req, res, next) {
    if (Object.hasOwn(res.locals, 'cacheable')) {
      res.set(finalHeaders);
    }
    return next();
  };
}

