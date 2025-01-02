import { describe, test, expect, spyOn } from "bun:test";
import { createGenerator, createStream } from ".";

spyOn(globalThis, "setTimeout").mockImplementation(
	Object.assign((f: () => void) => f(), setTimeout),
);

describe(createGenerator.name, () => {
	test("yields multiple chunks", async () => {
		const text = "MENS SANA IN CORPORE SANO";
		const generator = createGenerator(text);

		const chunks: string[] = [];
		for await (const chunk of generator) {
			chunks.push(chunk);
		}

		expect(chunks.length).toBeGreaterThanOrEqual(text.split(" ").length);
		expect(chunks.join("")).toBe(text);
	});
});

describe(createStream.name, () => {
	test("outputs multiple chunks", async () => {
		const text = "AMICUS CERTUS IN RE INCERTA";
		const stream = createStream(text);
		const reader = stream.getReader();

		const chunks: string[] = [];
		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				break;
			}
			chunks.push(value);
		}

		expect(chunks.length).toBeGreaterThanOrEqual(text.split(" ").length);
		expect(chunks.join("")).toBe(text);
	});
});
