import agent from "../wrap/agent.ts";

export default async (agent: agent) => {
	const r = await agent.instance.app.bsky.feed.getFeedGenerator({
		feed:
			"at://did:plc:wzsilnxf24ehtmmc3gssy5bu/app.bsky.feed.generator/mentions",
	});
	console.log(r);

	let cursor = undefined;
	const f = await agent.instance.app.bsky.feed.getFeed({
		feed: r.data.view.uri,
		limit: 1,
		cursor,
	});
	console.log(f);
	cursor = f.data.cursor || cursor;
};
