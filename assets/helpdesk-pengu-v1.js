(()=>{'use strict';
if(document.getElementById('ubs-help-launcher'))return;
const script=document.currentScript,assets=new URL('.',script.src);
const image=new URL('penguin-web-v1.webp',assets).href;
const launcher=document.createElement('button');launcher.id='ubs-help-launcher';launcher.type='button';launcher.setAttribute('aria-label','Ask Pengu — open help desk');launcher.setAttribute('aria-expanded','false');launcher.setAttribute('aria-controls','ubs-help-panel');launcher.title='Ask Pengu';
const icon=document.createElement('img');icon.src=image;icon.alt='';icon.decoding='async';icon.fetchPriority='low';launcher.append(icon);
const panel=document.createElement('section');panel.id='ubs-help-panel';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-labelledby','ubs-help-title');
panel.innerHTML='<header><img alt=""><div><strong id="ubs-help-title">Ask Pengu</strong><small>UBS website help desk</small></div><button id="ubs-help-close" type="button" aria-label="Close help desk">×</button></header><div id="ubs-help-messages" role="log" aria-live="polite" aria-relevant="additions" aria-label="Help desk conversation"></div><div id="ubs-help-topics"></div><form><input id="ubs-help-input" aria-label="Your question" placeholder="How can we help?" maxlength="400" autocomplete="off"><button type="submit">Send</button></form><a id="ubs-help-support" href="https://wa.me/918727074564?text=Hello%20KD%20FINCORP%2C%20I%20need%20help%20with%20UBS." target="_blank" rel="noopener noreferrer">Contact the KD FINCORP team ↗</a>';
panel.querySelector('img').src=image;panel.querySelector('img').decoding='async';document.body.append(launcher,panel);
const input=panel.querySelector('input'),log=panel.querySelector('[role=log]');
function add(text,user=false){const p=document.createElement('p');p.textContent=text;if(user)p.dataset.user='true';log.append(p);while(log.children.length>60)log.firstElementChild.remove();log.scrollTop=log.scrollHeight;}
add('Hi, I am Pengu. Ask about our software, plans, downloads or contacting KD FINCORP.');
const generalOnly='For accounting questions and tasks inside UBS, please use the desktop app assistant or contact our support team. This website help desk covers general UBS information, plans, downloads and contact details.';
const answers=[
[/\b(?:plan|plans|licen[cs]e|licen[cs]ing|trial|price|pricing|cost|renewal|renew|buy|purchase)\b/i,'UBS offers a 15-day trial after account verification. Paid access depends on your approved plan and devices. Contact KD FINCORP for current pricing, renewals or a plan recommendation.'],
[/\b(?:download|downloads|install|installation|update|updates|version)\b/i,'Download UBS from the Downloads section of this website. The current Windows version is 3.4.6; Android is 3.4.1. The Help & verify downloads page lists official checksums.'],
[/\b(?:contact|support|team|demo|email|phone|call|whatsapp)\b/i,'For a demo, product enquiry or support, contact KD FINCORP at +91 87270 74564 or kdfincorpindia@gmail.com. You can also use the contact link below.'],
[/\b(?:offline|internet|windows|android|platform|platforms|devices|pc|mobile)\b/i,'UBS is available for Windows PCs and Android devices. Everyday accounting works offline after initial verification and activation. Internet is used for cloud backup, licence updates and software downloads.'],
[/\b(?:about|ubs|software|feature|features|offer|offers|bookkeeping|billing|reports|inventory)\b/i,'Ultimate Business Software (UBS), by KD FINCORP, brings bookkeeping, billing, inventory and financial reports into one application. Ask about plans, supported devices or downloading UBS, or contact us for a demo.'],
[/^(?:hi|hello|hey|good morning|good afternoon|good evening)[!. ]*$/i,'Hello! I can help with general UBS information, plans, downloads and contacting our team.']];
function reply(text){add(text,true);
 const inApp=/\b(?:enter|record|post|calculate|step.by.step|debit|credit|journal|voucher|map|allocate|allocation|ledger|gst|tax|receipt|payment|profit|balance|scan|ocr|quotation|quick billing|backup|sync)\b/i.test(text);
 const match=inApp?null:answers.find(([pattern])=>pattern.test(text));
 add(match?match[1]:generalOnly);
}
for(const label of ['About UBS','Plans & trial','Downloads','Contact team']){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=()=>reply(label);panel.querySelector('#ubs-help-topics').append(b);}
function close(){panel.hidden=true;launcher.setAttribute('aria-expanded','false');launcher.focus();}
launcher.onclick=()=>{if(!panel.hidden){close();return;}panel.hidden=false;launcher.setAttribute('aria-expanded','true');input.focus();};panel.querySelector('#ubs-help-close').onclick=close;
panel.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}});
panel.querySelector('form').onsubmit=e=>{e.preventDefault();const text=input.value.trim();if(text){reply(text);input.value='';input.focus();}};
})();
