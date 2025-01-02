import { defineConfig, devices } from "@playwright/test";

const ci = Boolean(process.env.CI);
const localServerUrl = "http://127.0.0.1:9999";

export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: ci,
	retries: ci ? 2 : 0,
	workers: ci ? 1 : undefined,
	reporter: ci ? "dot" : "list",
	quiet: ci,
	use: {
		baseURL: localServerUrl,
		trace: "on-first-retry",
	},

	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},

		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},

		{
			name: "Mobile Chrome",
			use: { ...devices["Pixel 5"] },
		},
		{
			name: "Mobile Safari",
			use: { ...devices["iPhone 12"] },
		},
	],

	webServer: {
		command: "bun run demo",
		url: localServerUrl,
		reuseExistingServer: !ci,
	},
});
