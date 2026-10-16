import React,{useMemo,useState} from 'react';
import {sortLibraries,requestCount} from './library-sorting.mjs';
import {UIIcon} from './ui-icons.jsx';
import {formatBytes} from './data-client.mjs';
const approaches=[
 {name:'Direct React imports',tag:'Usual starting point',loads:'Only the imported icons, when the package and bundler support tree shaking.',when:'You know the icons in advance and are building with React.'},
 {name:'Local SVG files',loads:'Selected SVGs as inline markup or separately cached files.',when:'You want exact artwork without an icon service. Inline SVGs need no separate icon request.'},
 {name:'On-demand icon API',loads:'Requested icon data over the network, with provider-specific batching and caching.',when:'Icon names are chosen at runtime from a large catalog. Account for latency, failures, privacy, and availability.'},
 {name:'Full icon font or collection',tag:'Avoid as default',loads:'A shared file that may contain many unused icons.',when:'You have measured a reason to use most of the collection.'}
];
const sources=[['Lucide React documentation','https://lucide.dev/guide/react/'],['Iconify on-demand components','https://iconify.design/docs/icon-components/'],['MDN lazy loading','https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading'],['Layout shift guidance','https://web.dev/articles/optimize-cls/']];
const metrics=[{key:'gzipBytes',label:'Gzipped estimate'},{key:'bytes',label:'Raw JSON'},{key:'requests',label:'Requests'}];
export function Considerations({catalog}){
 const [metric,setMetric]=useState('gzipBytes');
 const [sort,setSort]=useState({key:'gzipBytes',direction:'asc'});
 const libraries=useMemo(()=>sortLibraries(catalog?.libraries||[],sort.key,sort.direction),[catalog,sort]);
 const value=l=>metric==='requests'?requestCount(l):l[metric];
 const maximum=Math.max(1,...libraries.map(value));
 const metricLabel=metrics.find(m=>m.key===metric).label;
 const order=key=>sort.key===key?(sort.direction==='asc'?'ascending':'descending'):undefined;
 function changeMetric(key){setMetric(key);setSort(s=>s.key==='name'?s:{...s,key})}
 function toggleSort(key){setSort(s=>({key,direction:s.key===key&&s.direction==='asc'?'desc':'asc'}))}
 return <article className="considerations"><h1>Using icons efficiently</h1>
 <nav className="jump-chips" aria-label="On this page">{[['approach','Approach'],['steps','Steps'],['sizes','Sizes']].map(([id,label])=><a key={id} href={'#'+id}>{label}</a>)}</nav>
 <p className="size-callout">These are totals for the whole library, not what your site adds. Import only the icons you use; their added size depends on the artwork and your build.</p>
 <section id="approach"><h2>Choose an approach</h2><div className="approach-list">{approaches.map((a,index)=><article className="approach-card" key={a.name}><div className="approach-heading"><h3>{a.name}</h3>{a.tag&&<span className={'approach-tag'+(index===0?' recommended':'')}>{a.tag}</span>}</div><dl><div><dt>Loads</dt><dd>{a.loads}</dd></div><div><dt>Use it when</dt><dd>{a.when}</dd></div></dl></article>)}</div></section>
 <section id="steps"><h2>Steps for a React project</h2><ol className="react-steps">
 <li><strong>Choose one main family.</strong> Keep interface action-to-icon mappings in one small component module.</li>
 <li><strong>Import only what you use.</strong> Check the production output for unused icons. Installed package size is not browser bundle size.</li>
 <li><strong>Load optional catalogs later.</strong> Fetch bounded chunks when the feature opens. For long grids, use virtualization to limit mounted tiles.</li>
 <li><strong>Reserve space for icons.</strong> Give containers explicit dimensions and match loading placeholders to reduce layout shifts.</li>
 <li><strong>Keep controls accessible.</strong> Name icon-only buttons, hide decorative SVGs, and preserve visible keyboard focus.</li>
 <li><strong>Measure a production build.</strong> Test a throttled mobile connection. Check transferred bytes, requests, caching, render time, and DOM size.</li>
 </ol></section>
 <section id="sizes"><h2>Library data sizes</h2>
 <details className="measurement"><summary>How we measure</summary><div><p>Totals include every generated name index and SVG chunk in a library. Gzip figures estimate each file compressed independently at build time. They are not measured browser downloads, memory usage, or the cost of importing a few icons.</p><p>Actual transfer size depends on hosting compression, caching, and requested files. Opening a library loads its name indexes; scrolling fetches the chunks needed for each batch. Each chunk holds up to 256 icons. Search results can span multiple chunks.</p><p>Data comes from this website, without third-party icon API calls. A bounded session cache and the browser’s HTTP cache can reuse files. This browser’s infinite grid currently keeps mounted tiles as you scroll.</p><p>Raw JSON is uncompressed storage size. Requests count all indexes and chunks if the entire library were fetched, rather than a normal first batch. Decimal units: 1 kB = 1,000 bytes; 1 MB = 1,000,000 bytes. Bars compare the selected measure against the largest library on one shared linear scale.</p></div></details>
 <div className="size-controls"><div className="filter-chips" role="group" aria-label="Size measure">{metrics.map(m=><button key={m.key} aria-pressed={metric===m.key} onClick={()=>changeMetric(m.key)}>{m.label}</button>)}</div><div className="size-sort" role="group" aria-label="Sort libraries"><span>Sort</span><button aria-pressed={sort.key==='name'} onClick={()=>toggleSort('name')}>Name {sort.key==='name'&&<span>{sort.direction==='asc'?'A–Z':'Z–A'}</span>}</button><button aria-pressed={sort.key===metric} onClick={()=>toggleSort(metric)}>{metric==='requests'?'Requests':'Size'} {sort.key===metric&&<span>{sort.direction==='asc'?'smallest first':'largest first'}</span>}</button></div></div>
 {!catalog?<p role="status">Loading library sizes...</p>:<table className="size-table"><caption className="sr-only">Library totals: {metricLabel}, sorted by {sort.key==='name'?'name':metricLabel}, {sort.direction==='asc'?'ascending':'descending'}.</caption><thead><tr><th scope="col" aria-sort={order('name')}>Library</th><th scope="col" aria-sort={order(metric)}>{metricLabel}</th></tr></thead><tbody>{libraries.map(l=><tr key={l.id}><th scope="row">{l.name}</th><td><span className="size-value">{metric==='requests'?value(l).toLocaleString():formatBytes(value(l))}</span><span className="size-bar" aria-hidden="true"><span style={{width:(value(l)/maximum*100)+'%'}}/></span></td></tr>)}</tbody></table>}
 </section>
 <section><h2>Sources</h2><div className="source-links">{sources.map(([label,url])=><a href={url} key={url} target="_blank" rel="noreferrer"><span>{label}<span className="sr-only"> (opens in a new tab)</span></span><UIIcon name="external-link" size={16}/></a>)}</div></section>
 </article>;
}
