import Agent from "./agent.ts";

const generator = async (agent: Agent, url: string) => {
	const i = await agent.instance.app.bsky.feed.getFeedGenerator({
		feed: url,
	});
	console.log("getFeedGenerator\n", i);
	return i;
};

export default async (agent: Agent, url: string) => {
	const r = (await generator(agent, url)).data.view.uri;

	let cursor = "";
	const next = async (limit: number) => {
		const f = await agent.instance.app.bsky.feed.getFeed({
			feed: r,
			limit,
			cursor,
		});
		console.log("getFeed\n", f);
		cursor = f.data.cursor || cursor;
		return f.data.feed;
	};

	return next;
};

export const feedUrl = (appUrl: string) => {
	return appUrl
		.replace(
			new RegExp(".*\\/profile\\/"),
			"at://",
		).replace(
			"/feed/",
			"/app.bsky.feed.generator/",
		);
};