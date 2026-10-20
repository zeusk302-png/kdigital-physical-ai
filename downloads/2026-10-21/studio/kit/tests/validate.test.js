import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact } from '../src/validate.js';
const valid = { name:'연습', email:'learner@example.com', message:'1234567890' };
test('공백 이름 거절', () => assert.equal(validateContact({...valid,name:'  '}).ok,false));
test('이메일 형식 거절', () => assert.equal(validateContact({...valid,email:'bad@'}).ok,false));
test('최소 길이 직전 거절', () => assert.equal(validateContact({...valid,message:'123456789'}).ok,false));
test('최소 길이 허용', () => assert.equal(validateContact(valid).ok,true));
test('전송 성공으로 오해하지 않는 문구', () => assert.match(validateContact(valid).message,/전송하지/));
// TODO: 요구가20자 이상으로 바뀌면 위 경계 입력도19자와20자로 고칩니다.
