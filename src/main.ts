import secrets from "../io/o/secre.ts";
import { Agent, CredentialSession } from "@atproto/api";

const credentials = new CredentialSession(new URL(secrets.bluesky.service));
await credentials.login({
	identifier: secrets.bluesky.identifier,
	password: secrets.bluesky.password,
});

await (import("./bot.ts").then((m) => m.default(new Agent(credentials))));

await credentials.logout();
