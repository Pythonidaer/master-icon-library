import test from 'node:test';
import assert from 'node:assert/strict';
import {sortLibraries} from '../src/library-sorting.mjs';
const libs=[{id:'z',name:'Zeta',bytes:999,gzipBytes:200,sets:[{chunks:[1,2]}]},{id:'a',name:'Alpha',bytes:1000,gzipBytes:99,sets:[{chunks:[1]}]}];
test('File-size sorting uses raw numbers instead of formatted kB/MB strings',()=>{assert.deepEqual(sortLibraries(libs,'bytes','asc').map(l=>l.id),['z','a']);assert.deepEqual(sortLibraries(libs,'bytes','desc').map(l=>l.id),['a','z']);assert.deepEqual(sortLibraries(libs,'gzipBytes','asc').map(l=>l.id),['a','z'])});
test('Library names and total data request counts sort in either direction',()=>{assert.deepEqual(sortLibraries(libs,'name','asc').map(l=>l.id),['a','z']);assert.deepEqual(sortLibraries(libs,'name','desc').map(l=>l.id),['z','a']);assert.deepEqual(sortLibraries(libs,'requests','asc').map(l=>l.id),['a','z'])});
test('Sorting leaves the source catalog untouched and resolves ties consistently',()=>{const original=[...libs];sortLibraries(libs,'bytes','desc');assert.deepEqual(libs,original);assert.deepEqual(sortLibraries(libs.map(l=>({...l,bytes:1})),'bytes').map(l=>l.name),['Alpha','Zeta'])});
