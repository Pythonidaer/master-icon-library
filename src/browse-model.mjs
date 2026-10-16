export function nativeStyle(prefix,name,suffixes={}){
 const suffix=Object.keys(suffixes).filter(Boolean).sort((a,b)=>b.length-a.length).find(s=>name.endsWith('-'+s));
 if(suffix!==undefined)return suffixes[suffix].replace(/^\d+\s+/,'').replace(/\s+\d+x\d+$/,'');
 if('' in suffixes)return suffixes[''].replace(/\s+\d+x\d+$/,'');
 if(prefix==='tabler')return name.endsWith('-filled')?'Filled':'Outline';
 if(prefix==='heroicons-outline')return 'Outline';
 if(prefix==='heroicons-solid')return 'Solid';
 return null;
}
const topics={Arrows:/arrow|chevron|caret|direction/,Media:/play|pause|audio|video|music|volume|camera|film|microphone|speaker/,Weather:/weather|cloud|sun|rain|snow|wind|storm|moon|temperature/,Devices:/device|phone|computer|laptop|tablet|monitor|keyboard|printer|watch/};
export function iconTopics(name,native=[]){return [...new Set([...native,...Object.entries(topics).filter(([,re])=>re.test(name)).map(([label])=>label)])]}
export function countedStyles(items){const counts=new Map();for(const i of items)if(i.style)counts.set(i.style,(counts.get(i.style)||0)+1);return [...counts].filter(([,n])=>n>=Math.ceil(items.length*.05)).sort(([a],[b])=>a.localeCompare(b)).map(([value,count])=>({value,label:`${value} ${count.toLocaleString()}`,count}))}
export function gridWindow({count,columns,size,top,scroll,height,overscan=3}){const step=size+8;const rows=Math.ceil(count/columns);const first=Math.max(0,Math.min(rows,Math.floor((scroll-top)/step)-overscan));const last=Math.min(rows,Math.max(first,Math.ceil((scroll+height-top)/step)+overscan));return {start:first*columns,end:Math.min(count,last*columns),offset:first*step,height:Math.max(0,rows*step-8)}}
export function readRoute(search){const p=new URLSearchParams(search);return p.get('library')?'library:'+p.get('library'):p.get('page')==='saved'?'saved':p.get('page')==='considerations'?'considerations':'home'}
export function routeSearch(route){const p=new URLSearchParams();if(route.startsWith('library:'))p.set('library',route.slice(8));else if(route!=='home')p.set('page',route);return p.size?'?'+p:''}
