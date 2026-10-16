import test from 'node:test';
import assert from 'node:assert/strict';
import {createDataClient,resolveIcons} from '../src/data-client.mjs';
test('Page hydration requests only required chunks and coalesces shared chunk requests',async()=>{
 const requested=[];const file={icons:{heart:{body:'<path/>',width:24,height:24},star:{body:'<path/>',width:24,height:24}}};
 const client=createDataClient(async url=>{requested.push(url);return {ok:true,json:async()=>file}});
 const items=[{id:'test:heart',name:'heart',chunk:'test-0'},{id:'test:star',name:'star',chunk:'test-0'}];
 const [first,second]=await Promise.all([resolveIcons(items,client),resolveIcons(items,client)]);
 assert.equal(requested.length,1);assert.deepEqual(requested,['./data/test-0.json']);assert.equal(first.length,2);assert.equal(second[0].body,'<path/>');
});
test('Cache evicts oldest parsed data and allows retries after network failures',async()=>{
 const requests=[];let failed=false;const client=createDataClient(async url=>{requests.push(url);if(url.includes('retry')&&!failed){failed=true;return {ok:false,status:503}}return {ok:true,json:async()=>({})}},2);
 await client('a');await client('b');await client('c');await client('a');assert.equal(requests.filter(x=>x==='./data/a.json').length,2);
 await assert.rejects(client('retry'));await client('retry');assert.equal(requests.filter(x=>x==='./data/retry.json').length,2);
});
test('A missing SVG produces an actionable error rather than an empty icon',async()=>{await assert.rejects(resolveIcons([{chunk:'set-0',name:'missing'}],async()=>({icons:{}})),/Reload the page/)});
