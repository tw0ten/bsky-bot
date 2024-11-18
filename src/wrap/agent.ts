import { Agent, AppBskyFeedPost, Facet, RichText } from "@atproto/api";

export default class {
	instance: Agent;
	did;

	constructor(instance: Agent) {
		this.instance = instance;
		this.did = this.instance.did!;
	}

	profile = () => this.instance.getProfile({ actor: this.did });

	private upload = (data: string | Uint8Array) => {
		return this.instance.uploadBlob(
			data,
		);
	};

	post = async (
		{
			date = new Date(),
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
			embed?: undefined;
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

		const data: AppBskyFeedPost.Record = {
			createdAt: date.toISOString(),
			text: rt.text,
			facets: rt.facets,
			langs: langs,
			tags: tags,
			labels: undefined,
			embed: undefined,
		};

		console.log("post\n", data);
		return this.instance.post(data);
	};
}
