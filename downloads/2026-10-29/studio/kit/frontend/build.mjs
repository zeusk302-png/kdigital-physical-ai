import * as esbuild from 'esbuild';
const options={entryPoints:['src/main.jsx'],bundle:true,outfile:'../web/app.js',minify:false,sourcemap:false,loader:{'.css':'css'},nodePaths:process.env.KDIGITAL_NODE_MODULES?[process.env.KDIGITAL_NODE_MODULES]:[]};
if(process.argv.includes('--watch')){const c=await esbuild.context(options);await c.watch();console.log('JSX 감시 중. 저장 뒤 브라우저를 새로고침하세요.');}else await esbuild.build(options);
