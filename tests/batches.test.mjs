import test from 'node:test';
import assert from 'node:assert/strict';
import {planIconBatch,mergeIconBatch} from '../src/data-client.mjs';

test('Load more retains existing SVG objects and fetches only the added items',()=>{
 const first={id:'set:first',name:'first',body:'<path/>',width:24,height:24};
 const second={id:'set:second',name:'second'};
 const requested=[{id:first.id,name:first.name},second];
 const plan=planIconBatch(requested,[first]);
 assert.equal(plan.retained[0],first);
 assert.deepEqual(plan.missing,[second]);
 const additional={...second,body:'<circle/>',width:24,height:24};
 const merged=mergeIconBatch(requested,plan.retained,[additional]);
 assert.equal(merged[0],first);
 assert.equal(merged[1],additional);
});

test('Changing filters removes old results and merges new results in requested order',()=>{
 const old={id:'set:old',body:'<path/>'},kept={id:'set:kept',body:'<circle/>'};
 const requested=[{id:'set:new'},{id:'set:kept'}];
 const plan=planIconBatch(requested,[old,kept]);
 assert.deepEqual(plan.retained,[kept]);
 assert.deepEqual(plan.missing,[{id:'set:new'}]);
 const added={id:'set:new',body:'<rect/>'};
 assert.deepEqual(mergeIconBatch(requested,plan.retained,[added]).map(x=>x.id),['set:new','set:kept']);
});

test('An incomplete load does not silently publish a partial successful batch',()=>{
 assert.throws(()=>mergeIconBatch([{id:'missing'}],[],[]),/incomplete/);
});
