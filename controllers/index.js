/**
 * Basic Routes
 */

/**
 * GET /
 * Homepage.
 */
exports.index = (req, res) => {
  res.render("home");
};

/**
 * GET *
 * 404
 */
exports.PageNotFound = (req, res) => {
  res.send("<h1>404 - Page Not Found</h1>");
};