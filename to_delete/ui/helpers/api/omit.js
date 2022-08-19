//login
/*
The omit() helper function is used to omit/exclude a key from an object (obj). 
It's used in the tutorial app to omit the password hash property from users returned 
by the api (e.g. users index handler, users id handler).
The lodash library contains an omit function as well, but I decided to write my 
own since it's a tiny function and would've felt like overkill to add a whole library for it.
*/

export { omit };

function omit(obj, key) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}
