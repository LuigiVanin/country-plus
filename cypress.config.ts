import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.LOCAL_WEBPAGE_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      LOCAL_WEBPAGE_URL: process.env.LOCAL_WEBPAGE_URL,
    },
  },
});
