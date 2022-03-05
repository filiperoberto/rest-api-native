import { ServerResponse, IncomingMessage } from "http";
import { Response } from "./IResponse";

const registeredRoutes = {
  GET: {},
  POST: {},
  DELETE: {},
  PUT: {},
} as any;

const request = (req: IncomingMessage, res: Response, callback: Function) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk.toString();
  });
  req.on("end", () => {
    let body = "";
    try {
      body = JSON.parse(data);
    } catch (e) {}
    callback({ body }, res);
  });
};

const response = (res: ServerResponse): Response => {
  return {
    json: (status: number, data: object) => {
      res.writeHead(status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    },
  };
};

export const router = (req: IncomingMessage, res: ServerResponse) => {
  const rs = response(res);

  if (
    registeredRoutes[req.method || ""] &&
    registeredRoutes[req.method || ""][req.url || "/"]
  ) {
    request(req, rs, registeredRoutes[req.method || ""][req.url || "/"]);
    return;
  }
  rs.json(404, {
    success: false,
    error: "Not Found",
  });
};

export const get = (url: string, callback: Function) => {
  registeredRoutes["GET"][url] = callback;
};

export const post = (url: string, callback: Function) => {
  registeredRoutes["POST"][url] = callback;
};

export const put = (url: string, callback: Function) => {
  registeredRoutes["PUT"][url] = callback;
};

export const del = (url: string, callback: Function) => {
  registeredRoutes["DELETE"][url] = callback;
};
