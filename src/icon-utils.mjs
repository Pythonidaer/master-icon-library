export const defaults={size:48,color:'#20231e',background:'#f1f2eb',rotation:0,flipX:false,flipY:false,opacity:1,stroke:null,linecap:null,linejoin:null,duotone:null,padding:24,palette:{},zoom:1,offsetX:0,offsetY:0,motion:'none',duration:2,dash:0};
export function capabilities(icon){const body=icon?.body||'';return {stroke:/stroke[=\s]/.test(body),duotone:/opacity=/.test(body),colors:[...new Set(body.match(/#[0-9a-fA-F]{3,8}\b/g)||[])]};}
export function customizeBody(icon,options){
 let body=icon.body;const c=capabilities(icon);
 // Only change stroke attributes on genuine stroked paths. Filled artwork keeps its original shape.
 if(c.stroke&&options.stroke!==null){body=body.replace(/stroke-width="[^"]*"/g,`stroke-width="${options.stroke}"`).replace(/stroke-linecap="[^"]*"/g,`stroke-linecap="${options.linecap||'round'}"`).replace(/stroke-linejoin="[^"]*"/g,`stroke-linejoin="${options.linejoin||'round'}"`);body=`<g stroke-width="${options.stroke}" stroke-linecap="${options.linecap||'round'}" stroke-linejoin="${options.linejoin||'round'}">${body}</g>`;}
 if(c.stroke&&options.dash)body=`<g stroke-dasharray="${options.dash}">${body}</g>`;
 if(c.duotone&&options.duotone!==null)body=body.replace(/((?:fill-|stroke-)?opacity)="0?\.\d+"/g,`$1="${options.duotone}"`);
 for(const [from,to] of Object.entries(options.palette||{}))body=body.split(from).join(to);
 return body;
}
export function svgMarkup(icon,options=defaults){
 const w=icon.width,h=icon.height;let body=customizeBody(icon,options);
 const dur=`${options.duration||2}s`;const cx=w/2,cy=h/2;
 const animations={spin:`<animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="${dur}" repeatCount="indefinite"/>`,pulse:`<animate attributeName="opacity" values="1;0.25;1" dur="${dur}" repeatCount="indefinite"/>`,bounce:`<animateTransform attributeName="transform" type="translate" values="0 0;0 ${-h*.18};0 0" dur="${dur}" repeatCount="indefinite"/>`,shake:`<animateTransform attributeName="transform" type="rotate" values="0 ${cx} ${cy};-12 ${cx} ${cy};12 ${cx} ${cy};0 ${cx} ${cy}" dur="${dur}" repeatCount="indefinite"/>`};
 if(animations[options.motion])body=`<g>${animations[options.motion]}${body}</g>`;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${options.size}" height="${options.size}" viewBox="0 0 ${w} ${h}" fill="currentColor" color="${options.color}"><g opacity="${options.opacity}" transform="translate(${w/2+(options.offsetX||0)} ${h/2+(options.offsetY||0)}) rotate(${options.rotation}) scale(${(options.flipX?-1:1)*(options.zoom||1)} ${(options.flipY?-1:1)*(options.zoom||1)}) translate(${-w/2} ${-h/2})">${body}</g></svg>`;
}
export function jsxMarkup(svg){
 return svg.replace(/class=/g,'className=').replace(/\s([a-zA-Z]+(?:[-:][a-zA-Z]+)+)=/g,(_,key)=>' '+(/^(aria|data)-/.test(key)?key:key.replace(/[-:]([a-z])/g,(_,x)=>x.toUpperCase()))+'=').replace(/style="([^"]*)"/g,(_,css)=>{
  const entries=css.split(';').filter(Boolean).map(rule=>{const colon=rule.indexOf(':');return [rule.slice(0,colon).trim().replace(/-([a-z])/g,(_,x)=>x.toUpperCase()),rule.slice(colon+1).trim()]});
  return `style={${JSON.stringify(Object.fromEntries(entries))}}`;
 });
}

const variantWords=/^(?:thin|light|regular|bold|fill|filled|duotone|outline|outlined|solid|line|twotone|rounded|round|sharp|small|medium|large|mini|micro|baseline|[1-9]00|16|20|24|28|32|48)$/;
export function variantTags(name){return name.split('-').filter(x=>variantWords.test(x));}
export function baseName(name){return name.split('-').filter(x=>!variantWords.test(x)).join('-');}
