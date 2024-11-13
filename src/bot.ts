import { Agent } from "@atproto/api";

export default async (agent: Agent) => {
	await agent.post({
		text: "test",
	});
};
