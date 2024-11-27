import l from "l";
import secrets from "../io/o/secre.ts";
import { Agent, CredentialSession } from "@atproto/api";

l.i(">");
l.n("main");

{
	const credentials = new CredentialSession(new URL(secrets.bluesky.service));
	l.i("login..");
	await credentials.login({
		identifier: secrets.bluesky.identifier,
		password: secrets.bluesky.password,
	});
	l.i(credentials.did, credentials.serviceUrl.host);

	await import("@/bot.ts")
		.then((m) => m.default(new Agent(credentials)))
		.catch(l.e);

	l.i("logout..");
	await credentials.logout();
	l.i(".");
}

l.u();
l.i("<");
