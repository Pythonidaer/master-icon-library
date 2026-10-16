// Prefer comparable subjects, then fill every remaining slot with distinct SVGs.
export function selectSamples(icons,prefix,count=6){
 const keys=Object.keys(icons).filter(key=>icons[key].body.trim());
 const selected=[],seenNames=new Set(),seenBodies=new Set();
 function add(key){if(!key||seenNames.has(key)||seenBodies.has(icons[key].body))return;selected.push(key);seenNames.add(key);seenBodies.add(icons[key].body)}
 for(const names of [['heart'],['star'],['home','house'],['search','magnifying-glass'],['settings','gear','cog'],['sun'],['camera']]){
  for(const name of names){const key=keys.find(k=>k===name)||keys.find(k=>k.startsWith(name+'-'));if(key&&!seenBodies.has(icons[key].body)){add(key);break}}
  if(selected.length===count)break;
 }
 for(const key of keys){if(selected.length===count)break;add(key)}
 return selected.map(name=>({name,prefix,...icons[name]}));
}
