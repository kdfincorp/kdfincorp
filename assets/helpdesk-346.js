(()=>{'use strict';
if(document.getElementById('ubs-help-launcher'))return;
const script=document.currentScript,assets=new URL('.',script.src);
const image=new URL('penguin-v2.png',assets).href;
const launcher=document.createElement('button');launcher.id='ubs-help-launcher';launcher.type='button';launcher.setAttribute('aria-label','Ask UBS — open help desk');launcher.setAttribute('aria-expanded','false');launcher.setAttribute('aria-controls','ubs-help-panel');launcher.title='Ask UBS';
const icon=document.createElement('img');icon.src=image;icon.alt='';launcher.append(icon);
const panel=document.createElement('section');panel.id='ubs-help-panel';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-labelledby','ubs-help-title');
panel.innerHTML='<header><img alt=""><div><strong id="ubs-help-title">Ask UBS</strong><small>Product guidance &amp; support</small></div><button id="ubs-help-close" type="button" aria-label="Close help desk">×</button></header><div id="ubs-help-messages" role="log" aria-live="polite" aria-relevant="additions" aria-label="Help desk conversation"></div><div id="ubs-help-topics"></div><form><input id="ubs-help-input" aria-label="Your question" placeholder="How can we help?" maxlength="400" autocomplete="off"><button type="submit">Send</button></form><a id="ubs-help-support" href="https://wa.me/918727074564?text=Hello%20KD%20SOFTWARES%2C%20I%20need%20help%20with%20UBS." target="_blank" rel="noopener noreferrer">Contact the KD FINCORP team ↗</a>';
panel.querySelector('img').src=image;document.body.append(launcher,panel);
const input=panel.querySelector('input'),log=panel.querySelector('[role=log]');
function add(text,user=false){const p=document.createElement('p');p.textContent=text;if(user)p.dataset.user='true';log.append(p);while(log.children.length>60)log.firstElementChild.remove();log.scrollTop=log.scrollHeight;}
add('Welcome to UBS. I can help you find product guidance, downloads and support. Choose a topic or type a question. This website guide does not access your books.');
const answers=[
[/quotation|quick\s*bill/i,'Quotation and Quick Billing screens have been removed in Windows 3.4.6. Use Transactions → Sales → Sales invoice for billing. Existing saved records are retained.'],
[/bill|scan|ocr|image|pdf|jpeg|recogn/i,'On Windows 3.4.6, open Scan bill from PDF / image from Find Screen. Select a PDF or bill photo, review the extracted party, items, quantities, prices and GST, then prepare the entry. You can create missing parties and items in the review screen. Recognition works offline. Always check the original before saving.'],
[/receipt|voucher|map|link|unpaid|payment/i,'When saving a receipt or payment voucher for a debtor or creditor, UBS can offer to link it to unpaid bills. Select the bills and allocate the amount. Partial payments are supported; an unallocated balance remains an advance. Review the party and allocation before saving.'],
[/backup|cloud|sync/i,'Eligible Windows users can enable live cloud backup in UBS. While the PC is running and connected, the backup agent syncs changes. Cloud retention keeps the current backup and the last two Tuesday snapshots when available. A switched-off or disconnected PC cannot upload. Keep a separate local recovery copy too.'],
[/licen|activat|trial|plan|price|cost|renew/i,'Create your UBS account and verify your email to begin the trial. KD FINCORP approves paid licence duration, devices and optional LAN access. Apply approved changes using Settings → Account & licence → Sync licence now. Contact the team for current plans and pricing.'],
[/download|install|update|version/i,'The latest Windows release is 3.4.6; Android remains 3.4.1. Use the website Download section or Help & verify downloads page. Update Windows in the same installation folder to retain books and settings. On Android, install over the existing app; do not clear its storage. Keep a backup before updating.'],
[/offline|internet|connect/i,'Day-to-day accounting and the Windows bill reader work offline after initial account verification and activation. Internet is used for cloud backups, licence updates and downloading software updates.'],
[/lan|network|multi.*user/i,'LAN hosting is built into UBS for eligible admin-approved licences. Use Settings to configure the host and connect approved client devices on the same local network. Ask KD FINCORP to enable LAN access on your licence.'],
[/lag|slow|error|crash|stuck|button/i,'First update Windows UBS to 3.4.6. If a screen still stalls or controls are clipped, contact the team with the screen name, steps that caused it and the error text. Avoid sharing passwords or licence keys in screenshots.'],
[/contact|human|support|help|hello|hi\b/i,'Use “Contact the KD FINCORP team” below for help with your account, a demo or an issue. You can also email kdsoftwaresindia@gmail.com or call +91 87270 74564.']];
function reply(text){add(text,true);const match=answers.find(([pattern])=>pattern.test(text));add(match?match[1]:'I do not have a reliable answer for that question. Please contact the KD FINCORP team below with the screen name and what you want to do.');}
for(const label of ['Scan a bill','Map a payment','Cloud backup','Download & update']){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=()=>reply(label);panel.querySelector('#ubs-help-topics').append(b);}
function close(){panel.hidden=true;launcher.setAttribute('aria-expanded','false');launcher.focus();}
launcher.onclick=()=>{if(!panel.hidden){close();return;}panel.hidden=false;launcher.setAttribute('aria-expanded','true');input.focus();};panel.querySelector('#ubs-help-close').onclick=close;
panel.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}});
panel.querySelector('form').onsubmit=e=>{e.preventDefault();const text=input.value.trim();if(text){reply(text);input.value='';input.focus();}};
})();
