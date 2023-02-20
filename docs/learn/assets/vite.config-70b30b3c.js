const t=`import { defineConfig } from 'vite'
import { reflexRefresh } from "reflex-dom/hmr-plugin";
import { resolve } from "path"
import { writeFileSync } from "fs"

export default defineConfig( viteConfig => {
	writeFileSync( resolve('ready'), '' )
	return {
		build: {
			rollupOptions: {
				input: [ resolve('./index.html') ]
			},
		},
		plugins: [
			reflexRefresh()
		]
	}
})
`;export{t as default};
