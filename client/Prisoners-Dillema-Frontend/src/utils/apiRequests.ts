import { io } from "socket.io-client";

export const socket = io("http://localhost:6769");

export function getRequest(endpoint: string) {
  socket.emit(endpoint);
  socket.on("request_response", (data) => {
    console.log(data)
  })
}

export async function postRequest(endpoint: string, payload: any) {
  let url = `${BACKEND_URL}${endpoint}`;

  const response = await axios.post(url, payload);
  return response;
}