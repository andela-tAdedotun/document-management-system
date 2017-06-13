const RemoveTrailingSlash = (app) => {
  // remove trailing slash from url paths
  return app.use((req, res, next) => {
    if (req.path.length > 1 && /\/$/.test(req.path)) {
      const query = req.url.slice(req.path.length);
      res.redirect(301, req.path.slice(0, -1) + query);
    } else {
      next();
    }
  });
}

export default RemoveTrailingSlash;
