import Agent from "./wrap/agent.ts";
import * as api from "@atproto/api";

export default async (agent: api.Agent) => await main(new Agent(agent));

const main = async (agent: Agent) => {
	await agent.post({ embed: await Deno.readFile("./io/o/cat.png") });
};
