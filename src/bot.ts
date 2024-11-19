import Agent from "./wrap/agent.ts";
import feed, { feedUrl } from "./wrap/feed.ts";
import * as api from "@atproto/api";

export default async (agent: api.Agent) => {
	console.log("bot");
	const a = new Agent(agent);
	await main(a);
	console.log("done");
};

const main = async (agent: Agent) => {
	return;
	{
		const next = await feed(
			agent,
			feedUrl(
				"https://bsky.app/profile/did:plc:z72i7hdynmk6r22z27h6tvur/feed/whats-hot",
			),
			//"at://did:plc:wzsilnxf24ehtmmc3gssy5bu/app.bsky.feed.generator/mentions",
		);
		const posts = await next(1);
		console.log(posts);

		for (const post of posts) {
			const replyRef = post.reply!;
			agent.post({ text: "rt", reply: replyRef });
		}
	}
};
