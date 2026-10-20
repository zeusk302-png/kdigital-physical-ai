// 브라우저의 root 상자에 App 컴포넌트를 연결하는 시작 파일입니다.
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/tokens.css';
import './styles/layout.css';
createRoot(document.getElementById('root')).render(<App />);
