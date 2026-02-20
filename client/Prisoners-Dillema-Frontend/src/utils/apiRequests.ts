import { io } from "socket.io-client";

export const socket = io("http://localhost:6769");

export function getRequest(endpoint: string) {
  socket.emit(endpoint);
  socket.on("request_response", (data) => {
    console.log(data)
  })
}


export function postRequest(endpoint: string, payload: any) {
  socket.emit(endpoint, payload)
  socket.on("request_response", (data) => {
    console.log(data)
  })
}