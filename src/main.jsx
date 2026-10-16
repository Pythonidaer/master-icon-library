import React,{useState,useEffect,useMemo,useRef,useId} from 'react';
import {createRoot} from 'react-dom/client';
import {defaults,capabilities,svgMarkup,jsxMarkup,variantTags,baseName} from './icon-utils.mjs';
import './style.css';
import {replaceIDs} from '@iconify/utils';
import {UIIcon} from './ui-icons.jsx';
import {createDataClient,resolveIcons,formatBytes,planIconBatch,mergeIconBatch} from './data-client.mjs';
import {Considerations} from './considerations.jsx';
import {SiteHeader} from './SiteHeader.jsx';
const dataFile=createDataClient();
function readSaved(){try{return JSON.parse(localStorage.getItem('master-icon-favorites')||'[]')}catch{return []}}
function Icon({icon,options=defaults}){const reduced=useReducedMotion();const displayOptions=reduced?{...options,motion:'none'}:options;const id=useId().replace(/[^a-zA-Z0-9]/g,'');return <span className="svg" aria-hidden="true" dangerouslySetInnerHTML={{__html:replaceIDs(svgMarkup(icon,displayOptions),`icon${id}-`)}}/>}
function App(){
 const [view,setView]=useState('collections'),[visible,setVisible]=useState([]),[tilesLoading,setTilesLoading]=useState(false),[retry,setRetry]=useState(0),[indexRetry,setIndexRetry]=useState(0);
 const [catalog,setCatalog]=useState(null),[error,setError]=useState(''),[library,setLibrary]=useState(null),[set,setSet]=useState('all'),[loaded,setLoaded]=useState([]),[loading,setLoading]=useState(false),[query,setQuery]=useState(''),[category,setCategory]=useState('All'),[style,setStyle]=useState('all'),[limit,setLimit]=useState(96),[selected,setSelected]=useState(null),[options,setOptions]=useState(defaults),[favorites,setFavorites]=useState(readSaved),[savedOnly,setSavedOnly]=useState(false),[notice,setNotice]=useState(''),[compare,setCompare]=useState([]),[showCompare,setShowCompare]=useState(false);
 const heading=useRef(null);const selectionRequest=useRef(0);const batches=useRef({scope:null,icons:[]});const focusBatch=useRef(null);const loadSentinel=useRef(null);const autoLoadPending=useRef(false);const batchSize=96;
 useEffect(()=>{fetch('./data/catalog.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Could not load library catalog.');return r.json()}).then(setCatalog).catch(e=>setError(e.message))},[]);
 useEffect(()=>{try{localStorage.setItem('master-icon-favorites',JSON.stringify(favorites))}catch{setNotice('Your browser could not save favorites.')}},[favorites]);
 useEffect(()=>{if(!notice)return;const t=setTimeout(()=>setNotice(''),2500);return()=>clearTimeout(t)},[notice]);
 useEffect(()=>{setLimit(batchSize)},[query,style,set,savedOnly]);
 useEffect(()=>{const onKey=e=>{if(e.key==='Escape'){closeInspector();setShowCompare(false)}};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[]);
 useEffect(()=>{
  if(!library&&!savedOnly){setLoaded([]);setLoading(false);return}
  let alive=true;setLoading(true);setError('');setLoaded([]);
  const allSets=catalog?.libraries.flatMap(l=>l.sets)||[];
  const sets=library?library.sets:allSets.filter(s=>favorites.some(i=>i.prefix===s.prefix));
  Promise.all(sets.map(s=>dataFile(s.indexFile))).then(indexes=>{
   if(alive)setLoaded(indexes.flatMap(s=>s.icons.map(i=>({...i,prefix:s.prefix,id:s.prefix+':'+i.name}))));
  }).catch(e=>{if(alive)setError(e.message)}).finally(()=>{if(alive)setLoading(false)});
  return()=>{alive=false};
 },[library,savedOnly,catalog,indexRetry]);
 useEffect(()=>{if(!selected)return;const previous=document.activeElement;const panel=document.querySelector('.inspector');panel?.focus();const trap=e=>{if(e.key!=='Tab')return;const nodes=[...panel.querySelectorAll('button,input,select,a,textarea')].filter(x=>!x.disabled&&x.getClientRects().length);const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&(document.activeElement===first||document.activeElement===panel)){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}};panel?.addEventListener('keydown',trap);document.body.style.overflow='hidden';return()=>{panel?.removeEventListener('keydown',trap);document.body.style.overflow='';previous?.focus()}},[!!selected]);
 const ids=useMemo(()=>new Set(favorites.map(x=>x.id)),[favorites]);
 const filtered=useMemo(()=>loaded.filter(i=>(set==='all'||i.prefix===set)&&(!savedOnly||ids.has(i.id))&&(style==='all'||variantTags(i.name).includes(style))&&query.toLowerCase().split(/\s+/).every(q=>(i.name+' '+i.prefix).toLowerCase().includes(q))),[loaded,set,savedOnly,ids,query,style]);
 const browseKey=JSON.stringify([library?.id,savedOnly,set,style,query]);
 const batchItems=useMemo(()=>filtered.slice(0,limit),[filtered,limit]);
 useEffect(()=>{
  let alive=true;
  const previous=batches.current.scope===browseKey?batches.current.icons:[];
  const {retained,missing}=planIconBatch(batchItems,previous);
  batches.current={scope:browseKey,icons:retained};setVisible(retained);
  if(!missing.length){autoLoadPending.current=false;setTilesLoading(false);return}
  setTilesLoading(true);setError('');
  resolveIcons(missing,dataFile).then(additional=>{
   if(!alive)return;
   const icons=mergeIconBatch(batchItems,retained,additional);
   batches.current={scope:browseKey,icons};setVisible(icons);
  }).catch(e=>{if(alive){focusBatch.current=null;setError(e.message)}}).finally(()=>{if(alive){autoLoadPending.current=false;setTilesLoading(false)}});
  return()=>{alive=false};
 },[batchItems,browseKey,retry]);
 const displayed=batches.current.scope===browseKey?visible:[];
 useEffect(()=>{
  const pending=focusBatch.current;
  if(pending?.scope===browseKey&&displayed.length>pending.index){
   const control=document.querySelectorAll('.icons .icon-pick')[pending.index];
   if(control){control.focus({preventScroll:true});control.scrollIntoView({block:'nearest'})}
   focusBatch.current=null;
  }
 },[visible,browseKey]);
 const styles=useMemo(()=>[...new Set(loaded.filter(i=>set==='all'||i.prefix===set).flatMap(i=>variantTags(i.name)))].sort(),[loaded,set]);
 const libraries=useMemo(()=>catalog?.libraries.filter(l=>(category==='All'||l.category===category)&&(l.name+' '+l.sets.map(s=>s.name).join(' ')).toLowerCase().includes(query.toLowerCase()))||[],[catalog,query,category]);
 function openLibrary(l){setView('collections');setLibrary(l);setSavedOnly(false);setQuery('');setSet('all');setStyle('all');setLimit(batchSize);window.scrollTo({top:0});}
 function home(){setView('collections');setLibrary(null);setSavedOnly(false);setQuery('');setSet('all');setStyle('all');setLimit(batchSize)}
 function toggleSave(i){setFavorites(f=>f.some(x=>x.id===i.id)?f.filter(x=>x.id!==i.id):[...f,{id:i.id,name:i.name,prefix:i.prefix}])}
 function closeInspector(){selectionRequest.current++;setSelected(null)}
 async function choose(i){
  const request=++selectionRequest.current;
  try{const icon='body' in i?i:(await resolveIcons([i],dataFile))[0];if(request!==selectionRequest.current)return;setSelected(icon);setOptions({...defaults,palette:{}})}catch(e){setNotice(e.message)}
 }
 function update(key,value){setOptions(x=>({...x,...(['linecap','linejoin'].includes(key)&&x.stroke===null?{stroke:Number(selected?.body.match(/stroke-width="([^"]+)"/)?.[1]||2)}:{}),[key]:value}))}
 async function copy(text){try{await navigator.clipboard.writeText(text);setNotice('Copied')}catch{setNotice('Clipboard unavailable. Use Download SVG.')}}
 function download(){const url=URL.createObjectURL(new Blob([svgMarkup(selected,options)],{type:'image/svg+xml'}));const a=document.createElement('a');a.href=url;a.download=selected.prefix+'-'+selected.name+'.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
 const browsing=!!library||savedOnly;const caps=capabilities(selected);const related=selected?loaded.filter(x=>x.id!==selected.id&&baseName(x.name)===baseName(selected.name)):[];
 const autoScrollSupported='IntersectionObserver' in window;
 function requestMore(event){
  if(autoLoadPending.current||tilesLoading||displayed.length>=filtered.length)return;
  autoLoadPending.current=true;
  focusBatch.current=event?.detail===0?{scope:browseKey,index:displayed.length}:null;
  if(error){setRetry(value=>value+1);return}
  setLimit(value=>Math.min(filtered.length,value+batchSize));
 }
 useEffect(()=>{
  if(!autoScrollSupported||view!=='collections'||!browsing||loading||tilesLoading||error||selected||showCompare||!displayed.length||displayed.length>=filtered.length)return;
  const target=loadSentinel.current;if(!target)return;
  let triggered=false;
  const observer=new IntersectionObserver(entries=>{
   if(triggered||!entries.some(entry=>entry.isIntersecting))return;
   triggered=true;observer.disconnect();requestMore();
  },{rootMargin:'0px 0px 240px 0px',threshold:0});
  observer.observe(target);return()=>observer.disconnect();
 },[autoScrollSupported,view,browsing,browseKey,loading,tilesLoading,error,!!selected,showCompare,displayed.length,filtered.length]);

 return <><SiteHeader view={view} savedOnly={savedOnly} savedCount={favorites.length} onHome={home} onConsiderations={()=>{home();setView('considerations');window.scrollTo({top:0})}} onSaved={()=>{home();setSavedOnly(true)}}/>
 <main>{view==='considerations'?<Considerations catalog={catalog}/>:<><section className="intro"><h1 ref={heading}>{library?.name||(savedOnly?'Saved icons':'Icon libraries')}</h1></section>
 <div className={'toolbar '+(browsing?'toolbar--icons':'toolbar--libraries')}><label className="search"><UIIcon name="search"/><input type="search" placeholder={browsing?'Search icons…':'Find a library…'} aria-label={browsing?'Search icons':'Find a library'} value={query} onChange={e=>{setLimit(batchSize);setQuery(e.target.value)}}/></label>{browsing?<><label className="select-label"><span className="sr-only">Collection</span><select value={set} onChange={e=>{setLimit(batchSize);setSet(e.target.value);setStyle('all')}}><option value="all">All collections</option>{(library?.sets||[...new Set(loaded.map(i=>i.prefix))].map(prefix=>({prefix,name:prefix}))).map(s=><option key={s.prefix} value={s.prefix}>{s.name}</option>)}</select></label><label className="select-label"><span className="sr-only">Variant</span><select value={style} onChange={e=>{setLimit(batchSize);setStyle(e.target.value)}}><option value="all">All variants</option>{styles.map(s=><option key={s}>{s}</option>)}</select></label></>:<label className="select-label"><span className="sr-only">Category</span><select value={category} onChange={e=>setCategory(e.target.value)}>{['All','Interface','Multicolor','Brands','Development','Specialized'].map(c=><option value={c} key={c}>{c==='All'?'All categories':c}</option>)}</select></label>}</div>
 {error&&<div className="error" role="alert">{error} <button onClick={()=>{setError('');if(loaded.length)setRetry(r=>r+1);else setIndexRetry(r=>r+1);if(!catalog)window.location.reload()}}>Retry</button></div>}
 {loading||!catalog||(tilesLoading&&!displayed.length)?<LoadingGrid library={!!library||savedOnly} count={batchItems.length||batchSize} name={library?.name||'icon data'}/>:!browsing?<><div className="section-meta"><span>{libraries.length.toLocaleString()} libraries</span></div><div className="libraries">{libraries.map((l,index)=><button className="library" key={l.id} onClick={()=>openLibrary(l)}><div className="library-top"><span>{l.category}</span></div><div className="samples">{l.samples.map(i=><Icon key={i.name} icon={i} options={{...defaults,size:27}}/>)}</div><div className="library-bottom"><h2>{l.name}</h2><span>{l.total.toLocaleString()} icons <span aria-hidden="true">·</span> {l.sets.length} {l.sets.length===1?'set':'sets'}</span><span className="library-size">Full data {formatBytes(l.bytes)}</span><span className="library-compressed">Gzip estimate {formatBytes(l.gzipBytes)}</span></div></button>)}</div>{!libraries.length&&<div className="empty">No libraries match that search.<button onClick={()=>{setLimit(batchSize);setQuery('');setCategory('All')}}>Clear filters</button></div>}</>:<><div className="section-meta"><span>{displayed.length.toLocaleString()} of {filtered.length.toLocaleString()} icons</span></div><div className="icons" id="icon-results" aria-busy={tilesLoading}>{displayed.map(i=><div className="icon-cell" key={i.id}><button className="icon-pick" onClick={()=>choose(i)}><Icon icon={i} options={{...defaults,size:30}}/><span>{i.name}</span>{(!library||library.sets.length>1)&&<small>{i.prefix}</small>}</button><button className={'save-icon '+(ids.has(i.id)?'is-saved':'')} aria-pressed={ids.has(i.id)} aria-label={(ids.has(i.id)?'Unsave ':'Save ')+i.name} onClick={()=>toggleSave(i)}><UIIcon name="star"/></button></div>)}</div>{!filtered.length&&<div className="empty">{savedOnly&&!favorites.length?'Save an icon with the star to start your shortlist.':'No icons match these filters.'}<button onClick={()=>{setLimit(batchSize);setQuery('');setSet('all');setStyle('all')}}>Clear filters</button></div>}{tilesLoading&&displayed.length>0&&<LoadingGrid library count={Math.max(0,batchItems.length-displayed.length)} name="more icons"/>}
 {filtered.length>batchSize&&<div ref={loadSentinel} className="infinite-loader">
  <p role="status" aria-live="polite">{tilesLoading?'Loading more icons...':displayed.length>=filtered.length?`All ${filtered.length.toLocaleString()} icons loaded`:''}</p>
  {displayed.length<filtered.length&&<button className={!error&&autoScrollSupported?'sr-only manual-load':'manual-load'} aria-controls="icon-results" disabled={tilesLoading} onClick={requestMore}>{error?'Retry loading icons':'Load more icons'}</button>}
 </div>}{library&&<aside className="credits"><h2>Sources & licenses</h2><p>Counts include named styles, sizes, and aliases. {library.id==='font-awesome'?'All free Font Awesome sets are included. Pro icons and paid styles require a separate license.':''} Size, color, rotation, flip, and opacity work across collections. Stroke and palette controls appear when supported by the actual SVG.</p>{library.sets.map(s=><div key={s.prefix}><span>{s.name} · {s.count.toLocaleString()}</span><a href={s.license?.url||s.source?.url||'https://iconify.design'} target="_blank" rel="noreferrer">{s.license?.title||'License'}</a></div>)}</aside>}</>}
 </>}<footer><span>Master Icon Library</span><span>React Icons + Iconify data · {catalog?new Date(catalog.generated).toLocaleDateString():''}</span><a href="https://icon-sets.iconify.design/" target="_blank" rel="noreferrer">Iconify catalog</a></footer></main>
 {selected&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)closeInspector()}}><section className="inspector" role="dialog" aria-modal="true" aria-labelledby="icon-name" tabIndex="-1"><div className="inspector-head"><span className="eyebrow">ICON INSPECTOR</span><button className="close" onClick={()=>{closeInspector()}} aria-label="Close inspector"><UIIcon name="x"/></button></div><h2 id="icon-name">{selected.name}</h2><p className="muted">{selected.prefix}</p><div className="preview" style={{background:options.background,padding:options.padding}}><Icon icon={selected} options={options}/></div><div className="inspector-actions"><button onClick={()=>toggleSave(selected)}>{ids.has(selected.id)?'Remove from saved':'Save icon'}</button><button onClick={()=>{setCompare(x=>x.some(i=>i.id===selected.id)?x:x.length<4?[...x,{...selected,options:{...options}}]:x);setNotice(compare.length>=4?'Compare holds four icons. Remove one to add another.':'Added to comparison')}}>Add to compare</button></div>
 <div className="controls"><Range label="Size" unit="px" name="size" min={12} max={160} value={options.size} update={update}/><div className="color-row"><label>Color<input type="color" value={options.color} onChange={e=>update('color',e.target.value)}/></label><label>Background<input type="color" value={options.background} onChange={e=>update('background',e.target.value)}/></label></div><Range label="Rotation" unit="°" name="rotation" min={0} max={360} value={options.rotation} update={update}/><Range label="Opacity" name="opacity" min={0} max={1} step={.05} value={options.opacity} update={update}/><div className="flip-row"><label><input type="checkbox" checked={options.flipX} onChange={e=>update('flipX',e.target.checked)}/> Flip horizontal</label><label><input type="checkbox" checked={options.flipY} onChange={e=>update('flipY',e.target.checked)}/> Flip vertical</label></div>{caps.stroke&&<><Range label="Stroke width" name="stroke" min={.25} max={5} step={.25} value={options.stroke??Number(selected.body.match(/stroke-width="([^"]+)"/)?.[1]||2)} update={update}/><div className="color-row"><label>Line cap<select value={options.linecap||'round'} onChange={e=>update('linecap',e.target.value)}>{['round','butt','square'].map(x=><option key={x}>{x}</option>)}</select></label><label>Line join<select value={options.linejoin||'round'} onChange={e=>update('linejoin',e.target.value)}>{['round','miter','bevel'].map(x=><option key={x}>{x}</option>)}</select></label></div></>}{caps.duotone&&<Range label="Secondary opacity" name="duotone" min={0} max={1} step={.05} value={options.duotone??.2} update={update}/>} {!!caps.colors.length&&<div><p className="control-title">Original palette</p><div className="palette">{caps.colors.map(color=><label key={color}>{color}<input type="color" value={options.palette[color]||normalizeColor(color)} onChange={e=>update('palette',{...options.palette,[color]:e.target.value})}/></label>)}</div></div>}
 {!!related.length&&<label className="variant-picker">Native variants<select value={selected.id} onChange={e=>{const next=loaded.find(x=>x.id===e.target.value);choose(next)}}><option value={selected.id}>{selected.prefix}: {selected.name}</option>{related.map(i=><option value={i.id} key={i.id}>{i.prefix}: {i.name}</option>)}</select></label>}
 <details className="advanced"><summary>More adjustments</summary><div className="controls"><Range label="Scale" name="zoom" min={.25} max={2} step={.05} value={options.zoom} update={update}/><Range label="Horizontal offset" name="offsetX" min={-selected.width/2} max={selected.width/2} step={.5} value={options.offsetX} update={update}/><Range label="Vertical offset" name="offsetY" min={-selected.height/2} max={selected.height/2} step={.5} value={options.offsetY} update={update}/>{caps.stroke&&<Range label="Dash length" name="dash" min={0} max={12} step={.5} value={options.dash} update={update}/>}<label className="variant-picker">Animation<select value={options.motion} onChange={e=>update('motion',e.target.value)}>{['none','spin','pulse','bounce','shake'].map(m=><option key={m}>{m}</option>)}</select></label>{options.motion!=='none'&&<Range label="Duration" unit="s" name="duration" min={.5} max={10} step={.5} value={options.duration} update={update}/>}</div></details><p className="small-note">Background is for preview. Downloads contain the icon only. Native filled weights are selected as variants; stroke controls apply to stroked SVGs.</p><button className="text-button" onClick={()=>setOptions({...defaults,palette:{}})}>Reset appearance</button></div>
 <div className="export"><button className="primary" onClick={download}>Download SVG</button><div><button onClick={()=>copy(svgMarkup(selected,options))}>Copy SVG</button><button onClick={()=>copy(jsxMarkup(svgMarkup(selected,options)))}>Copy JSX</button><button onClick={()=>copy(selected.id)}>Copy name</button></div></div></section></div>}
 {!!compare.length&&<div className="compare-tray"><span>{compare.length} / 4 selected</span><button className="primary" onClick={()=>{closeInspector();setShowCompare(x=>!x)}}>{showCompare?'Close comparison':'Compare icons'}</button><button onClick={()=>{setCompare([]);setShowCompare(false)}}>Clear</button></div>}
 {showCompare&&<div className="compare-panel"><div className="compare-heading"><h2>Side by side</h2><button onClick={()=>setShowCompare(false)} aria-label="Close comparison"><UIIcon name="x"/></button></div><div className="comparison">{compare.map(i=><div key={i.id}><div className="preview" style={{background:i.options.background}}><Icon icon={i} options={i.options}/></div><strong>{i.name}</strong><p>{i.prefix}</p><button onClick={()=>setCompare(x=>x.filter(y=>y.id!==i.id))}>Remove</button></div>)}</div></div>}
 <div className="toast" role="status" aria-live="polite">{notice}</div><SearchShortcut/></>;
}
function useReducedMotion(){const [reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const listener=()=>setReduced(media.matches);media.addEventListener('change',listener);return()=>media.removeEventListener('change',listener)},[]);return reduced}
function LoadingGrid({library,count,name}){return <div className="loading-state" aria-busy="true"><p role="status">Loading {name}...</p><div className={library?'icons':'libraries'} aria-hidden="true">{Array.from({length:library?Math.min(96,count):33},(_,index)=><div className={library?'icon-cell skeleton-icon':'library skeleton-library'} key={index}><div className="skeleton-symbol"/><div className="skeleton-line"/><div className="skeleton-line short"/></div>)}</div></div>}
function Range({label,name,value,update,unit='',...props}){return <label className="range"><span>{label}<output>{value}{unit}</output></span><input type="range" value={value} onChange={e=>update(name,Number(e.target.value))} {...props}/></label>}
function normalizeColor(c){if(c.length===4)return '#'+c.slice(1).split('').map(x=>x+x).join('');return c.slice(0,7)}
function SearchShortcut(){useEffect(()=>{const listener=e=>{if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&!document.querySelector('.inspector')){e.preventDefault();document.querySelector('input[type=search]')?.focus()}};window.addEventListener('keydown',listener);return()=>window.removeEventListener('keydown',listener)},[]);return null}
createRoot(document.getElementById('root')).render(<App/>);
