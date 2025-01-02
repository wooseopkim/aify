import { expect, test } from "@playwright/test";

test("aify the ultimate question", async ({ page }) => {
	test.setTimeout(20_000);

	await page.goto("/");
	const input = page.getByRole("textbox");
	const submit = page.getByRole("button");
	const progress = page.getByRole("progressbar");
	const output = page.getByRole("paragraph", { includeHidden: true });

	await input.fill("What do you get when you multiply six by nine?");
	await submit.click();
	await progress.waitFor({ state: "visible" });
	await progress.waitFor({ state: "hidden" });

	await expect(output).toHaveText(/.{10,}/);
});
