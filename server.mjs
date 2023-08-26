import fastify from "fastify";
import { remixFastifyPlugin } from "@mcansh/remix-fastify";
import { installGlobals } from "@remix-run/node";

import * as serverBuild from "./build/index.mjs";

installGlobals();

let MODE = process.env.NODE_ENV;

let app = fastify();

// Fastify parses application/json by default, but, still, adding
// content parser for application/json does not fix issue.

// app.addContentTypeParser(
//   "application/json",
//   { parseAs: "string" },
//   function (req, body, done) {
//     try {
//       var json = JSON.parse(body);
//       console.log("body", json);
//       done(null, json);
//     } catch (err) {
//       err.statusCode = 400;
//       done(err, undefined);
//     }
//   }
// );
await app.register(remixFastifyPlugin, {
  build: serverBuild,
  mode: MODE,
  getLoadContext: () => ({ loadContextName: "John Doe" }),
  purgeRequireCacheInDevelopment: false,
  unstable_earlyHints: true,
});

let port = process.env.PORT ? Number(process.env.PORT) || 3000 : 3000;

let address = await app.listen({ port, host: "0.0.0.0" });
console.log(`✅ app ready: ${address}`);

if (MODE === "development") {
  let { broadcastDevReady } = await import("@remix-run/node");
  broadcastDevReady(serverBuild);
}
