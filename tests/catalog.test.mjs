import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {defaults,svgMarkup,jsxMarkup,capabilities,baseName} from '../src/icon-utils.mjs';
const catalog=JSON.parse(await fs.readFile('public/data/catalog.json'));
test('Every promised collection is present with its full generated icon count',async()=>{
 const required=['lucide','phosphor','tabler','heroicons','iconoir','font-awesome','ant-design','bootstrap','boxicons','circum','css-gg','feather','flat-color','octicons','grommet','icomoon','ionicons','line-awesome','material','radix','remix','simple-line','themify','typicons','vscode','simple-icons','devicons','game-icons','weather','carbon','fluent','unicons','iconpark'];
 assert.deepEqual(catalog.libraries.map(l=>l.id),required);
 for(const lib of catalog.libraries){let count=0;for(const set of lib.sets){const data=JSON.parse(await fs.readFile(`public/data/${set.prefix}.json`));assert.equal(Object.keys(data.icons).length,set.count);assert.ok(set.count>0);if(!['themify','devicons-react'].includes(set.prefix)){const upstream=JSON.parse(await fs.readFile(`node_modules/@iconify/json/json/${set.prefix}.json`));assert.equal(set.count,Object.keys(upstream.icons).length+Object.keys(upstream.aliases||{}).length)}for(const [name,icon] of Object.entries(data.icons)){assert.ok(icon.body || (set.prefix==='codicon'&&name==='blank'));assert.ok(icon.width>0&&icon.height>0)}count+=set.count}assert.equal(count,lib.total)}
});
test('Custom SVG preserves viewBox and applies transforms and genuine stroke edits',()=>{const icon={width:24,height:24,body:'<path fill="none" stroke="currentColor" stroke-width="2" d="M2 2h20"/>'};const svg=svgMarkup(icon,{...defaults,stroke:3,flipX:true,rotation:90});assert.match(svg,/viewBox="0 0 24 24"/);assert.match(svg,/stroke-width="3"/);assert.match(svg,/rotate\(90\)/);assert.match(svg,/scale\(-1 1\)/);assert.match(jsxMarkup(svg),/strokeWidth="3"/)});
test('Filled artwork has no artificial stroke controls; palette and duotone remain editable',()=>{const icon={width:16,height:16,body:'<path fill="#ff0000" opacity="0.2" d="M0 0h16v16z"/>'};assert.equal(capabilities(icon).stroke,false);const svg=svgMarkup(icon,{...defaults,duotone:.5,palette:{'#ff0000':'#00ff00'}});assert.match(svg,/fill="#00ff00"/);assert.match(svg,/opacity="0.5"/);assert.doesNotMatch(svg,/stroke-width/)});
test('Native variants group by actual icon base names',()=>{assert.equal(baseName('heart-duotone'),baseName('heart-bold'));assert.equal(baseName('home-rounded-24-filled'),baseName('home-sharp-20-outlined'))});

test('JSX exports convert inline SVG styles and namespaced attributes',()=>{assert.match(jsxMarkup('<mask style="mask-type:alpha" xlink:href="#a"/>'),/style=\{\{"maskType":"alpha"\}\}/);assert.match(jsxMarkup('<use xlink:href="#a"/>'),/xlinkHref=/)});
