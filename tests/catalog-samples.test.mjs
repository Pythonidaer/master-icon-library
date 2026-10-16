import test from 'node:test';
import assert from 'node:assert/strict';
import {selectSamples} from '../scripts/catalog-samples.mjs';
const icon=body=>({body,width:24,height:24});
test('Five preferred matches are filled to six distinct previews',()=>{const icons=Object.fromEntries(['heart','star','house','sun','camera','calendar'].map(name=>[name,icon(name)]));const samples=selectSamples(icons,'test');assert.equal(samples.length,6);assert.equal(new Set(samples.map(s=>s.body)).size,6);assert.ok(samples.some(s=>s.name==='calendar'))});
test('Preview fallback skips blank icons and duplicate alias artwork',()=>{const icons={blank:icon(''),heart:icon('a'),alias:icon('a'),...Object.fromEntries(['b','c','d','e','f','g'].map(n=>[n,icon(n)]))};const samples=selectSamples(icons,'test');assert.equal(samples.length,6);assert.ok(samples.every(s=>s.body));assert.equal(new Set(samples.map(s=>s.body)).size,6)});
