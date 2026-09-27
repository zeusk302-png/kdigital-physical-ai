import { build } from "esbuild";
await build({ entryPoints: ["App.jsx"], bundle: true, minify: true, outfile: "app.bundle.js", define: { "process.env.NODE_ENV": '"production"' } });
