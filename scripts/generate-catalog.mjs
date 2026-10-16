import fs from 'node:fs/promises';
import {getIconData, iconToSVG} from '@iconify/utils';
import {renderToStaticMarkup} from 'react-dom/server';
import {createElement} from 'react';
import * as themify from 'react-icons/tfi';
import * as devicons from 'react-icons/di';
const root='node_modules/@iconify/json/';
const metadata=JSON.parse(await fs.readFile(root+'collections.json'));
const groups=[
 ['lucide','Lucide',['lucide']],['phosphor','Phosphor',['ph']],['tabler','Tabler Icons',['tabler']],['heroicons','Heroicons',['heroicons','heroicons-outline','heroicons-solid']],['iconoir','Iconoir',['iconoir']],
 ['font-awesome','Font Awesome · Free',['fa7-solid','fa7-regular','fa7-brands','fa6-solid','fa6-regular','fa6-brands','fa-solid','fa-regular','fa-brands','fa']],
 ['ant-design','Ant Design Icons',['ant-design']],['bootstrap','Bootstrap Icons',['bi']],['boxicons','Boxicons',['boxicons','bxl','bx','bxs']],['circum','Circum Icons',['circum']],['css-gg','css.gg',['gg']],['feather','Feather',['feather']],['flat-color','Flat Color Icons',['flat-color-icons']],['octicons','GitHub Octicons',['octicon']],['grommet','Grommet Icons',['grommet-icons']],['icomoon','IcoMoon Free',['icomoon-free']],['ionicons','Ionicons',['ion']],['line-awesome','Line Awesome',['la']],['material','Material Design',['mdi','mdi-light','ic','material-symbols','material-symbols-light']],['radix','Radix Icons',['radix-icons']],['remix','Remix Icon',['ri']],['simple-line','Simple Line Icons',['simple-line-icons']],['themify','Themify Icons',[]],['typicons','Typicons',['typcn']],['vscode','VS Code Icons',['vscode-icons','codicon']],['simple-icons','Simple Icons',['simple-icons']],['devicons','Devicons',['devicon','devicon-plain']],['game-icons','Game Icons',['game-icons']],['weather','Weather Icons',['wi']],['carbon','Carbon',['carbon']],['fluent','Fluent Icons',['fluent','fluent-color','fluent-mdl2']],['unicons','Unicons',['uil','uim','uit','uis']],['iconpark','IconPark',['icon-park','icon-park-outline','icon-park-solid','icon-park-twotone']]
];
const categories={ 'simple-icons':'Brands',devicons:'Development',vscode:'Development','game-icons':'Specialized',weather:'Specialized','flat-color':'Multicolor'};
await fs.mkdir('public/data',{recursive:true});let catalog=[];
for(const [id,name,prefixes] of groups){
 let sets=[];let total=0;let samples=[];
 for(const prefix of prefixes){
  const data=JSON.parse(await fs.readFile(root+'json/'+prefix+'.json')); const icons={};
  for(const key of [...Object.keys(data.icons),...Object.keys(data.aliases||{})]){
   const icon=getIconData(data,key);if(!icon)throw Error('Unresolved '+prefix+':'+key);
   const svg=iconToSVG(icon,{});icons[key]={body:svg.body,width:icon.width||data.width||16,height:icon.height||data.height||16};
  }
  const keys=Object.keys(icons);total+=keys.length;
  const m=metadata[prefix];sets.push({prefix,name:m.name,count:keys.length,license:m.license,author:m.author,source:m.source,version:data.info?.version||null});
  await fs.writeFile('public/data/'+prefix+'.json',JSON.stringify({prefix,icons}));
  if(!samples.length){const picked=['heart','star','home','house','search','settings','sun','camera'].map(q=>keys.find(k=>k===q)||keys.find(k=>k.startsWith(q+'-'))).filter(Boolean);samples=(picked.length>=4?picked:keys.slice(0,6)).slice(0,6).map(k=>({name:k,prefix,...icons[k]}));}
 }
 if(id==='themify'||id==='devicons'){
  const source=id==='themify'?themify:devicons;const prefix=id==='themify'?'themify':'devicons-react';const icons={};
  for(const [key,component] of Object.entries(source)){if(!/^(Tfi|Di)[A-Z]/.test(key))continue;const svg=renderToStaticMarkup(createElement(component));const v=svg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);icons[key]={body:svg.replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,''),width:v[2],height:v[3]};}
  const count=Object.keys(icons).length;total+=count;sets.push({prefix,name:id==='themify'?'Themify Icons':'Devicons (React Icons)',count,license:{title:id==='themify'?'MIT':'MIT',url:'https://github.com/react-icons/react-icons'},source:{url:'https://react-icons.github.io/react-icons/'}});
  await fs.writeFile('public/data/'+prefix+'.json',JSON.stringify({prefix,icons}));
  if(!samples.length)samples=Object.entries(icons).slice(0,6).map(([name,x])=>({name,prefix,...x}));
 }
 catalog.push({id,name,total,category:categories[id]||'Interface',sets,samples});
}
await fs.writeFile('public/data/catalog.json',JSON.stringify({generated:new Date().toISOString(),version:JSON.parse(await fs.readFile(root+'package.json')).version,libraries:catalog}));
console.log(`${catalog.length} libraries; ${catalog.reduce((n,l)=>n+l.total,0).toLocaleString()} icons and variants; all aliases resolved.`);
