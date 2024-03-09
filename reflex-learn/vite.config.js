import { defineConfig } from 'vite'
import { reflexRefresh } from "reflex-dom/hmr-plugin";
import { resolve } from "path";

export default defineConfig( c => {
	return {
		assetsInclude: ["src/stack/**/*.*"],
		root: resolve("./src"),
		base: c.mode === "production" ? '/reflex/learn' : '',
		build: {
			outDir: resolve("../docs/learn/"),
			manifest: true,
			assetsDir: "./",
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
