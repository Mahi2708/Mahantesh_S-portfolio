import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import './components/chat/Copilot.css';

// Final mobile override: legacy portfolio media rules previously pushed the
// O-01 panel off-screen on phones. This style is injected after all imported
// CSS so the Copilot remains visible and viewport-bound on small screens.
const o01MobileStyle = document.createElement('style');
o01MobileStyle.setAttribute('data-o01-mobile-fix', 'true');
o01MobileStyle.textContent = `
  .o01-root{position:fixed!important;inset:0!important;width:100vw!important;height:100dvh!important;z-index:2147483647!important;pointer-events:none!important}
  .o01-root .o01-chat-panel{display:flex!important;position:fixed!important;visibility:visible!important;opacity:1!important;transform:none!important;z-index:2147483647!important;pointer-events:auto!important;overflow:hidden!important}
  .o01-root .o01-floating{display:grid!important;position:fixed!important;visibility:visible!important;opacity:1!important;z-index:2147483647!important;pointer-events:auto!important}
  @media (max-width:600px){
    .o01-root .o01-chat-panel{left:8px!important;right:8px!important;top:8px!important;bottom:max(8px,env(safe-area-inset-bottom))!important;width:calc(100vw - 16px)!important;max-width:none!important;height:calc(100dvh - 16px)!important;max-height:none!important;min-height:0!important;border-radius:8px!important}
    .o01-root .o01-header{min-height:72px!important;padding:10px 11px!important}
    .o01-root .o01-hologram{width:52px!important;height:52px!important;flex-basis:52px!important}
    .o01-root .o01-communication-log{padding:11px!important;gap:10px!important}
    .o01-root .o01-message-bubble{max-width:calc(100vw - 105px)!important;font-size:11px!important;padding:9px 10px!important}
    .o01-root .o01-quick-actions{padding:8px 10px!important}
    .o01-root .o01-actions-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:5px!important}
    .o01-root .o01-action{min-width:0!important;padding:7px 3px!important;font-size:7px!important;line-height:1.15!important}
    .o01-root .o01-action-icon{width:27px!important;height:27px!important}
    .o01-root .o01-input-area{padding:8px 9px!important}
    .o01-root .o01-input-form{gap:6px!important}
    .o01-root .o01-radio-wrap{min-width:0!important;flex:1 1 auto!important}
    .o01-root .o01-radio-wrap input{min-width:0!important;width:100%!important;font-size:11px!important}
    .o01-root .o01-accelerate{width:58px!important;min-width:58px!important;height:58px!important;padding:4px!important}
    .o01-root .o01-accelerate span,.o01-root .o01-accelerate small{font-size:6px!important}
    .o01-root .o01-chat-footer{min-height:28px!important;padding:5px 8px!important;font-size:6px!important}
    .o01-root .o01-chat-footer em{display:none!important}
  }
  @media (max-width:380px){
    .o01-root .o01-header-copy p{display:none!important}
    .o01-root .o01-actions-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important}
    .o01-root .o01-action{font-size:6px!important}
    .o01-root .o01-action-icon{width:24px!important;height:24px!important}
    .o01-root .o01-accelerate{width:52px!important;min-width:52px!important;height:52px!important}
  }
`;
document.head.appendChild(o01MobileStyle);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
);
