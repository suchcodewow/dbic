//login
/*
The API handler is a wrapper function for all API route handlers in the 
/pages/api folder (e.g. authenticate handler, register handler). It enables 
adding global middleware to the Next.js request pipeline and adds support for 
global exception handling. The wrapper function accepts a handler object that 
contains a method for each HTTP method that is supported by the handler 
(e.g. get, post, put, delete etc). If a request is received for an unsupported 
HTTP method a 405 Method Not Allowed response is returned.
*/
import { errorHandler, jwtMiddleware } from "helpers/api";

export { apiHandler };

function apiHandler(handler) {
  return async (req, res) => {
    const method = req.method.toLowerCase();

    // check handler supports HTTP method
    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
      // global middleware
      await jwtMiddleware(req, res);

      // route handler
      await handler[method](req, res);
    } catch (err) {
      // global error handler
      errorHandler(err, res);
    }
  };
}
