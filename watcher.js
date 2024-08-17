import {exec,spawn} from 'node:child_process'
import {watch} from 'node:fs/promises'

const [node,_,file] = process.argv
/*exec('dir',(err,out,err_out) => {
console.log({out,
    err_out})
})*/
function spawnNode(){

const pr = spawn(node,[file]);
pr.stdout.pipe(process.stdout)
pr.stderr.pipe(process.stderr)
/*pr.stdout.on('data', (data) => {
  console.log(data.toString('utf8'));
});*/
pr.on('close', (code) =>{
  if(code !== null){
  process.exit(code)
              }
})   
return pr;
}
console.log('lunching process:')
let chnodepr = spawnNode()
const watcher = watch('./',{recursive: true});
let i = 0;
for await (const event of watcher) {
  
  if (event.filename == file) {
    chnodepr.kill('SIGKILL')
    i++;
if(i % 2 == 0){console.log('relunching process:')}
  chnodepr = spawnNode()
}  
  }