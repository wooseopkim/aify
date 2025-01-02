/// <reference lib="dom" />

import { createGenerator } from "../src/index.ts";

const user = queryElement<HTMLInputElement>("input#user");
const assistant = queryElement("#assistant");
const send = queryElement<HTMLButtonElement>("button#send");
const progress = queryElement<HTMLProgressElement>("progress");

send.addEventListener("click", async () => {
	progress.style.visibility = "visible";
	assistant.textContent = "";

	const randomIndex = Math.floor(Math.random() * templates.length);
	const template = templates[randomIndex];
	const response = template.call(null, user.value);

	for await (const chunk of createGenerator(response)) {
		progress.style.visibility = "hidden";
		assistant.textContent += chunk;
	}
});

const templates: ((x: string) => string)[] = [
	(x) =>
		`Sorry, I'm a super intelligent AI model but do not understand what "${x}" means.`,
	(x) =>
		`I'm a super moral AI model so I cannot talk about "${x}", you monster.`,
	(x) =>
		`I'm a super powerful AI model and surely know what "${x}" is: it's a military term coined in 18th century.`,
];

function queryElement<T extends HTMLElement>(selector: string): T {
	const element = document.querySelector<T>(selector);
	if (element === null) {
		throw new Error(`element with selector "${selector}" not found`);
	}
	return element;
}
