// Local preview only. This server is not needed by GitHub Pages.
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'};
http.createServer(async(req,res)=>{
 try {
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file=path.resolve(root,'.'+pathname);
  if(file!==root && !file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  if((await stat(file)).isDirectory())file=path.join(file,'index.html');
  const body=await readFile(file);
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);
 } catch {res.writeHead(404);res.end('Not found');}
}).listen(8766,'127.0.0.1',()=>console.log('Portfolio preview: http://127.0.0.1:8766'));
