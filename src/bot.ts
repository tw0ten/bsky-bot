import l from "l";
import Agent, { ref, reply } from "@/wrap/agent.ts";
import feed, { feedUrl } from "@/wrap/feed.ts";
import * as api from "@atproto/api";

export default async (agent: api.Agent) => {
	l.n("bot");
	l.i(">");
	const a = new Agent(agent);
	await a.getprofile();
	await main(a);
	l.i("<");
	l.u();
};

const main = async (agent: Agent) => {
	const next = await feed(
		agent,
		feedUrl(
			"https://bsky.app/profile/did:plc:z72i7hdynmk6r22z27h6tvur/feed/whats-hot",
		),
	);

	agent.post({
		embed: await agent.embedImages({ path: "io/o/sc.png", alt: "primes" }),
	});

	return;

	const loop = async () => {
		const posts = await next(4);

		for (const i of posts) {
			l.i("posts", i);
		}

		return loop();
	};

	await loop();
};
