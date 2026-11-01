const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menu.focus();}});
window.addEventListener('resize',()=>{if(window.innerWidth>760)closeMenu();});

const interfaceViews={
 dashboard:{image:'assets/ubs-dashboard.png',tag:'DASHBOARD',title:'Your business at a glance.',alt:'Actual UBS dashboard with demo sales, purchases, profit and payment reminders',caption:'See net sales, purchases, profit and upcoming payments in the UBS dashboard. Shown with fictional demo data.'},
 billing:{image:'assets/ubs-billing.png',tag:'BILLING & GST',title:'From line items to a sales bill.',alt:'Actual UBS sale bill form with demo customer, item quantities, rates and GST',caption:'Create sales bills with party details, item quantities, prices and GST rates. Shown with fictional demo data.'},
 reports:{image:'assets/ubs-reports.png',tag:'FINANCIAL REPORTS',title:'A clear view of your account balances.',alt:'Actual UBS trial balance showing demo account names and balanced debit and credit totals',caption:'Review account balances and debit and credit totals in the trial balance. Shown with fictional demo data.'}
};
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
 const view=interfaceViews[button.dataset.view];if(!view)return;
 const image=document.getElementById('gallery-image');image.src=view.image;image.alt=view.alt;
 document.getElementById('gallery-link').href=view.image;document.getElementById('gallery-image-link').href=view.image;
 document.getElementById('gallery-tag').textContent=view.tag;document.getElementById('gallery-title').textContent=view.title;document.getElementById('gallery-caption').textContent=view.caption;
 document.querySelectorAll('[data-view]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
}));
