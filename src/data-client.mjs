// Bound parsed SVG data rather than retaining every library for the entire session.
export function createDataClient(fetcher=fetch,maxEntries=24){
 const cache=new Map();
 return async function dataFile(file){
  if(cache.has(file)){const promise=cache.get(file);cache.delete(file);cache.set(file,promise);return promise;}
  const promise=fetcher(`./data/${file}.json`).then(r=>{if(!r.ok)throw Error(`Could not load icon data (${r.status}). Please retry.`);return r.json()}).catch(error=>{if(cache.get(file)===promise)cache.delete(file);throw error});
  cache.set(file,promise);
  while(cache.size>maxEntries)cache.delete(cache.keys().next().value);
  return promise;
 };
}
export async function resolveIcons(items,dataFile){
 const files=[...new Set(items.map(i=>i.chunk))];
 const sets=await Promise.all(files.map(file=>dataFile(file)));
 const byFile=new Map(files.map((file,index)=>[file,sets[index]]));
 return items.map(item=>{const icon=byFile.get(item.chunk)?.icons[item.name];if(!icon)throw Error('Icon not found. Reload the page to refresh the catalog.');return {...item,...icon}});
}
export function formatBytes(value){if(!Number.isFinite(value))return 'Unavailable';return value>=1_000_000?`${(value/1_000_000).toFixed(1)} MB`:`${Math.max(.1,value/1000).toFixed(1)} kB`;}

// Preserve requested order and existing SVG objects when appending a batch.
export function planIconBatch(requested,previous){
 const known=new Map(previous.map(icon=>[icon.id,icon]));
 return {retained:requested.filter(item=>known.has(item.id)).map(item=>known.get(item.id)),missing:requested.filter(item=>!known.has(item.id))};
}
export function mergeIconBatch(requested,retained,additional){
 const known=new Map([...retained,...additional].map(icon=>[icon.id,icon]));
 return requested.map(item=>{const icon=known.get(item.id);if(!icon)throw Error('The icon batch is incomplete. Please retry.');return icon});
}
