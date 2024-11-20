import Agent, { ref, reply } from "@/wrap/agent.ts";
import feed, { feedUrl } from "@/wrap/feed.ts";
import * as api from "@atproto/api";

export default async (agent: api.Agent) => {
	console.log("bot");
	const a = new Agent(agent);
	await main(a);
	console.log("done");
};

const main = async (agent: Agent) => {
	const next = await feed(
		agent,
		feedUrl(
			"https://bsky.app/profile/did:plc:z72i7hdynmk6r22z27h6tvur/feed/whats-hot",
		),
	);

	let i = 0;
	const loop = async () => {
		if (i > 10) return;
		const posts = await next(1);
		console.log(posts);

		for (const i of posts) {
			console.log(i);
			/*if (i.post.replyCount && i.post.replyCount > 100) {
				agent.post({
					reply: reply(ref(i.post.uri, i.post.cid)),
				});
			}*/
		}
		i++;
		await loop();
	};

	await loop();
};
