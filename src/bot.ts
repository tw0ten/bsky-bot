import { Agent } from "@atproto/api";

export default async (agent: Agent) => {
	const post = async (text = "") => {
		await agent.post({
			text: `auto\n${text}`,
		});
	};

	return;
	await post("test");
};
