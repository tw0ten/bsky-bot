import l from "l";
import {
	Agent,
	AppBskyActorDefs,
	AppBskyEmbedImages,
	AppBskyFeedPost,
	ComAtprotoRepoStrongRef,
	Facet,
	RichText,
} from "@atproto/api";

type StrongRef = ComAtprotoRepoStrongRef.Main;

export const ref = (uri: string, cid: string) => {
	return { uri, cid };
};

export const reply = (ref: StrongRef) => {
	return {
		root: ref,
		parent: ref,
	};
};

export default class {
	instance: Agent;
	did;
	profile!: AppBskyActorDefs.ProfileViewDetailed;

	constructor(instance: Agent) {
		this.instance = instance;
		this.did = instance.did!;
	}

	getprofile = async (did = this.did) => {
		const p = (await this.instance.getProfile({ actor: did })).data;
		if (did === this.did && p) {
			this.profile = p;
		}
		return p;
	};

	upload = async (data: string | Uint8Array) =>
		(await this.instance.uploadBlob(data)).data;

	embedImages = async (
		...i: { path: string; alt: string }[]
	) => {
		return {
			"$type": "app.bsky.embed.images",
			images: await Promise.all(i.map(async (i) => {
				return {
					image: (await this.upload(Deno.readFileSync(i.path))).blob,
					alt: i.alt,
				};
			})),
		};
	};

	post = async (
		{
			date = new Date(),
			text = "",
			facets = undefined,
			langs = undefined,
			tags = undefined,
			embed = undefined,
			reply = undefined,
		}: {
			text?: string;
			facets?: Facet[];
			langs?: string[];
			tags?: string[];
			date?: Date;
			embed?: AppBskyEmbedImages.Main;
			reply?: {
				root: StrongRef;
				parent: StrongRef;
			};
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
			langs,
			tags,
			labels: undefined,
			embed,
			reply,
		};

		l.i("post", data);
		return this.instance.post(data);
	};
}
