import { defineConfig } from 'vite'
import { reflexRefresh } from "reflex-dom/hmr-plugin";
import { resolve } from "path";

export default defineConfig( () => {
	return {
		root: resolve("./src"),
		build: {
			outDir: resolve("../docs/learn/"),
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
