export function requestCount(library){return library.sets.reduce((count,set)=>count+1+set.chunks.length,0)}
export function sortLibraries(libraries,key='name',direction='asc'){
 const value=library=>key==='requests'?requestCount(library):library[key];
 const multiplier=direction==='desc'?-1:1;
 return [...libraries].sort((a,b)=>{
  const primary=key==='name'?a.name.localeCompare(b.name):value(a)-value(b);
  return multiplier*primary||a.name.localeCompare(b.name)||a.id.localeCompare(b.id);
 });
}
