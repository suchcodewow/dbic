//login
/*
The global error handler is used catch all errors and remove the need for 
duplicated error handling code throughout the Next.js tutorial api. It's added 
to the request pipeline in the API handler wrapper function.
By convention errors of type 'string' are treated as custom (app specific) errors, 
this simplifies the code for throwing custom errors since only a string needs to be 
thrown (e.g. throw 'Username or password is incorrect'), if a custom error ends with 
the words 'not found' a 404 response code is returned, otherwise a standard 400 error 
response is returned.
If the error is an object with the name 'UnauthorizedError' it means JWT token 
validation has failed so a HTTP 401 unauthorized response code is returned with 
the message 'Invalid Token'.
All other (unhandled) exceptions are logged to the console and return a 500 server 
error response code.
*/
export { errorHandler };

function errorHandler(err, res) {
  if (typeof err === "string") {
    // custom application error
    const is404 = err.toLowerCase().endsWith("not found");
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }

  // default to 500 server error
  console.error(err);
  return res.status(500).json({ message: err.message });
}
