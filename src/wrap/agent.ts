import l from "@logger";
import {
	Agent,
	AppBskyActorDefs,
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

	private upload = (data: string | Uint8Array) =>
		this.instance.uploadBlob(data);

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
			embed?: undefined;
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
