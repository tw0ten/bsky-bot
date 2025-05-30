import l from "l";
import Agent from "#/wrap/agent.ts";
import feed, { feedUrl } from "#/wrap/feed.ts";
import * as api from "@atproto/api";

export default async (agent: api.Agent) => {
	l.n("bot");
	l.i(">");
	const a = new Agent(agent);
	await a.getprofile();
	if (a.profile) await main(a);
	else l.i("profile not loaded");
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
};
