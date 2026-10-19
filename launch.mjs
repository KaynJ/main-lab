import {spawn} from 'node:child_process';
import {openSync,closeSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root=path.dirname(fileURLToPath(import.meta.url));
const port=Number(process.env.PORT||4173);
if(!Number.isInteger(port)||port<1||port>65535)throw new Error('PORT must be between 1 and 65535.');
const url=`http://127.0.0.1:${port}/`;
async function running(){
 try {
  const response=await fetch(url,{signal:AbortSignal.timeout(1000)});
  return response.ok&&(await response.text()).includes('name="application-name" content="main-lab"');
 }catch{return false;}
}
if(await running()){
 console.log(`本命实验室已在运行：${url}`);
}else{
 const out=openSync(path.join(root,'preview.stdout.log'),'a');
 const err=openSync(path.join(root,'preview.stderr.log'),'a');
 const child=spawn(process.execPath,[path.join(root,'server.mjs')],{cwd:root,detached:true,windowsHide:true,stdio:['ignore',out,err]});
 let spawnError=null;
 child.on('error',error=>{spawnError=error;});
 child.unref();closeSync(out);closeSync(err);
 let ready=false;
 for(let attempt=0;attempt<20;attempt++){
  if(spawnError)throw spawnError;
  if(await running()){ready=true;break;}
  await new Promise(resolve=>setTimeout(resolve,200));
 }
 if(!ready)throw new Error(`启动失败，请检查 ${port} 端口是否被其他程序占用，或查看 preview.stderr.log。`);
 console.log(`本命实验室已启动：${url}`);
 console.log('后台服务会继续运行；可关闭这个启动窗口。');
}
