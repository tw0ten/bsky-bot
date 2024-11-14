import secrets from "../io/o/secre.ts";
import { Agent, CredentialSession } from "@atproto/api";

const credentials = new CredentialSession(new URL(secrets.bluesky.service));
await credentials.login({
	identifier: secrets.bluesky.identifier,
	password: secrets.bluesky.password,
});

const agent = new Agent(credentials);
console.log(agent.assertDid);

import("./bot.ts").then(async (m) => {
	await m.default(agent);
	credentials.logout();
});
