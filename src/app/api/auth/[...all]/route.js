import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.4.4"]);
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
