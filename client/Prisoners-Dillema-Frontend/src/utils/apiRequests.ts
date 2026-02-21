import axios from "axios";

const BACKEND_URL = "http://localhost:6769";

export async function postRequest(endpoint: string, payload: any) {
  let url = `${BACKEND_URL}${endpoint}`;

  try {
    const response = await axios.post(url, payload, { withCredentials: true });
    return response;
  } catch (error) {
    return error;
  }
}
