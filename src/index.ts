import { encode, decodeGenerator } from "gpt-tokenizer";

const DEFAULT_DELAY = 2000;
const DEFAULT_INTERVAL = 150;
type StreamConfig = {
	delay?: number;
	interval?: number;
};

export async function* createGenerator(
	text: string,
	config: StreamConfig = {},
): AsyncGenerator<string> {
	const reader = createStream(text, config).getReader();
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			break;
		}
		yield value;
	}
}

export function createStream(
	text: string,
	{ delay = DEFAULT_DELAY, interval = DEFAULT_INTERVAL }: StreamConfig = {},
): ReadableStream<string> {
	const tokens = encode(text);
	return new ReadableStream({
		async start(controller) {
			await sleep(delay);
			for (const chunk of decodeGenerator(tokens)) {
				await sleep(interval);
				controller.enqueue(chunk);
			}
			controller.close();
		},
	});
}

async function sleep(time: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}
