import { Agent, AppBskyFeedPost, Facet, RichText } from "@atproto/api";

export default class {
	private instance: Agent;

	did: string;

	constructor(instance: Agent) {
		this.instance = instance;
		this.did = this.instance.did!;
		console.log(this.did);
	}

	private upload = (data: string | Uint8Array) => {
		return this.instance.uploadBlob(
			data,
		);
	};

	post = async (
		{
			date = new Date("9999-12-31T23:59:59.999999999Z"),
			text = "",
			facets = undefined,
			langs = undefined,
			tags = undefined,
			embed = undefined,
		}: {
			text?: string;
			facets?: Facet[];
			langs?: string[];
			tags?: string[];
			date?: Date;
			embed?: Uint8Array;
		} = {},
	): Promise<{
		uri: string;
		cid: string;
	}> => {
		const rt = new RichText({
			text: text,
			facets: facets,
		});
		if (!facets) await rt.detectFacets(this.instance);

		const img = await this.upload(embed!);

		const data: AppBskyFeedPost.Record = {
			createdAt: date.toISOString(),
			text: rt.text,
			facets: rt.facets,
			langs: langs,
			tags: tags,
			labels: undefined,
			embed: {
				$type: "app.bsky.embed.images",
				images: [
					{
						alt: "My cat mittens",
						image: img.data.blob,
					},
				],
			},
			/*reply: {
				root: {
					uri: "at://did:plc:u5cwb2mwiv2bfq53cjufe6yn/app.bsky.feed.post/3k43tv4rft22g",
					cid: "bafyreig2fjxi3rptqdgylg7e5hmjl6mcke7rn2b6cugzlqq3i4zu6rq52q",
				},
				parent: {
					uri: "at://did:plc:u5cwb2mwiv2bfq53cjufe6yn/app.bsky.feed.post/3k43tv4rft22g",
					cid: "bafyreig2fjxi3rptqdgylg7e5hmjl6mcke7rn2b6cugzlqq3i4zu6rq52q",
				},
			},*/
		};

		console.log("post\n", data);
		return this.instance.post(data);
	};
}
