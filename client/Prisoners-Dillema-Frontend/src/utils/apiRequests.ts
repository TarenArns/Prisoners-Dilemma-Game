import axios from "axios";

export const BACKEND_URL = "http://localhost:6769";

export async function getRequest(endpoint: string) {
  const response = await axios.get(`${BACKEND_URL}${endpoint}`);
  return response; 
}


export async function postRequest(endpoint: string, payload: any) {
  let url = `${BACKEND_URL}${endpoint}`;

  const response = await axios.post(url, payload);
  return response;
}
