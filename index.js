import { Hocuspocus } from "@hocuspocus/server";

// Configure the server …
const server = new Hocuspocus({
  port: 1234,
});

// … and run it!
server.listen();


// import express from "express";
// import expressWebsockets from "express-ws";
// import { Server } from "@hocuspocus/server";

// // Configure Hocuspocus
// const server = Server.configure({
//   // ...
// });

// // Setup your express instance using the express-ws extension
// const { app } = expressWebsockets(express());

// // A basic http route
// app.get("/", (request, response) => {
//   response.send("Hello World!");
// });

// // Add a websocket route for Hocuspocus
// // Note: make sure to include a parameter for the document name.
// // You can set any contextual data like in the onConnect hook
// // and pass it to the handleConnection method.
// app.ws("/collaboration/:document", (websocket, request) => {
//   const context = {
//     user: {
//       id: 1234,
//       name: "Jane",
//     },
//   };
``
//   server.handleConnection(websocket, request, context);
// });

// // Start the server
// app.listen(1234, () => console.log("Listening on http://127.0.0.1:1234"));