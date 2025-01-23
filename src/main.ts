import { Logger } from "l";
import secrets from "../io/o/secre.ts";
import { Agent, CredentialSession } from "@atproto/api";

const l = new Logger("main");

l.i(">");
{
	const credentials = new CredentialSession(new URL(secrets.bluesky.service));

	l.n("auth");
	{
		try {
			l.i("resume");
			await credentials.resumeSession(
				JSON.parse(Deno.readTextFileSync("o/session")),
			);
		} catch {
			l.i("login");
			await credentials.login(secrets.bluesky);
		}
		l.i(credentials.did, credentials.serviceUrl.host);
		Deno.writeTextFile("o/session", JSON.stringify(credentials.session));
	}
	l.u();

	await import("#/bot.ts")
		.then((m) => m.default(new Agent(credentials)))
		.catch(l.e);

	l.i("logout");
	await credentials.logout();
}
l.i("<");
