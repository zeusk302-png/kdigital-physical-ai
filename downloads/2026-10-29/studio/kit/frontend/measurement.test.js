import test from 'node:test';import assert from 'node:assert/strict';
import {distanceStatus} from './src/measurement.js';
const row={device_id:'a',kind:'distance_cm',value:10,occurred_at:1};
test('empty is not normal',()=>assert.equal(distanceStatus([],20),'거리 기록 없음'));
test('null is not zero',()=>assert.equal(distanceStatus([{...row,value:null}],20),'마지막 측정 실패'));
test('boundary is inclusive normal',()=>assert.equal(distanceStatus([{...row,value:20}],20),'마지막 측정: 기준 이상'));
test('old rows do not replace latest',()=>assert.equal(distanceStatus([row,{...row,value:30,occurred_at:2}],20),'마지막 측정: 기준 이상'));
test('mixed devices blocked',()=>assert.match(distanceStatus([row,{...row,device_id:'b'}],20),/한 장치/));
test('invalid threshold blocked',()=>assert.match(distanceStatus([row],NaN),/양수/));
