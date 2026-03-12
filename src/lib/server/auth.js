import { API_USER, API_PASSWORD } from '$env/static/private';


export function checkAuth(request) {

  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith('Basic ')) {
    return false;
  }


  const base64 = authHeader.slice(6);


  const decoded = atob(base64);

  const [username, password] = decoded.split(":");

  if (username === API_USER && password === API_PASSWORD) {
    return true;
  }

  return false;
}