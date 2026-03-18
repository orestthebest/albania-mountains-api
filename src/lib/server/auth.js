import { API_USER, API_PASSWORD } from '$env/static/private';

// function to check if request is authorized
export function checkAuth(request) {

 // get Authorization header 
  const authHeader = request.headers.get("authorization");

   // check if it starts with "Basic "
  if (!authHeader?.startsWith('Basic ')) {
    return false;
  }

// remove "Basic " and get base64 string
  const base64 = authHeader.slice(6);

// decode base64 → "username:password"
  const decoded = atob(base64);

  // split into username and password
  const [username, password] = decoded.split(":");
 
  // compare with stored credentials, returns true only if both correct
  if (username === API_USER && password === API_PASSWORD) {
    return true;
  }

  // if not matching → unauthorized
  return false;
}