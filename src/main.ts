import * as api from "@atproto/api";
const agent = new api.Agent("https://bsky.social");

import secrets from "../io/i/secre.ts";
await agent.loing({
	identifier: secrets.bluesky.username,
	password: secrets.bluesky.password,
});

import("./bot.ts").then((m) => m.default(agent));
