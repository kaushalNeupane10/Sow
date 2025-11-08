import client from '../api/api.js'

const access_key = 'sow_access'
const refresh_key= 'sow_refresh'

export function setTokens({ access, refresh }){
  if (access) localStorage.setItem(access_key, access)
  if (refresh) localStorage.setItem(refresh_key, refresh)
}

export function getAccessToken() {
  return localStorage.getItem(access_key)
}
export function getRefreshToken(){
  return localStorage.getItem(refresh_key)
}
export function clearTokens() {
  localStorage.removeItem(access_key)
  localStorage.removeItem(refresh_key)

}

export function isAuthenticated() {
  const token = getAccessToken();
  if(!token) return false;

  try{
    const payload= JSON.parse(atob(token.split('.')[1])); 
    const expiry = payload.exp * 1000; 
    if (Date.now() >= expiry) {
      clearTokens(); 
      return false;
    }
    return true;
  } catch (err) {
    clearTokens(); 
    return false;
  }
}


export async function login(email, password) {
  const res= await client.post('token/', {email, password })
  const { access, refresh } = res.data
  setTokens({ access, refresh })
  return res.data

}

export async function register(username, email, password) {
  const res = await client.post('register/', {username, email, password})
  return res.data
}

export async function logout() {
  clearTokens()
  
}

export async function getProfile(){
  const res= await client.get('profile/') 
  return res.data
}
