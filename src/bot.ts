import Agent from "./wrap/agent.ts";
import * as api from "@atproto/api";

export default async (agent: api.Agent) => {
	console.log("bot");
	const a = new Agent(agent);
	await main(a);
};

const main = async (agent: Agent) => {
};
