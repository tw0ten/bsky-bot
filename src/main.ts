import secrets from "../io/o/secre.ts";
import { Agent, CredentialSession } from "@atproto/api";

console.log("main");

{
	const credentials = new CredentialSession(new URL(secrets.bluesky.service));
	console.log("login");
	await credentials.login({
		identifier: secrets.bluesky.identifier,
		password: secrets.bluesky.password,
	});
	console.log(`${credentials.did}@${credentials.serviceUrl.host}`);

	try {
		await (import("./bot.ts").then((m) => m.default(new Agent(credentials))));
	} catch (e) {
		console.error(e);
	}

	console.log("logout");
	await credentials.logout();
}

console.log("stop");
