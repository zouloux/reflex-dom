import { defineConfig } from 'vite'
import { reflexRefresh } from "../reflex-dom/src/hmr-plugin";
import { resolve } from "path";

export default defineConfig( () => {
	return {
		root: resolve("./src"),
		build: {
			outDir: resolve("./dist"),
			manifest: true,
			// assetsDir: "./",
			rollupOptions: {
				input: [
					resolve("./src/index.html")
				],
			},
		},
		plugins: [
			reflexRefresh()
		]
	}
})
