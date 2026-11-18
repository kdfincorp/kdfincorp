(()=>{
  'use strict';
  const windowsDownload=document.querySelector('[data-download="windows"]');
  if(windowsDownload&&!document.querySelector('[data-download="microsoft-store"]')){
    const storeLink=document.createElement('p');
    storeLink.className='package-note';
    storeLink.innerHTML='<a data-download="microsoft-store" href="https://apps.microsoft.com/detail/9MV3JXTLXRK5" target="_blank" rel="noopener noreferrer">Get UBS from the Microsoft Store &nearr;</a>';
    windowsDownload.insertAdjacentElement('afterend',storeLink);
  }
  const stage=document.querySelector('.depth-stage');
  if(!stage||!matchMedia('(hover: hover) and (pointer: fine)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches||navigator.connection?.saveData)return;
  let frame=0;
  stage.addEventListener('pointermove',event=>{
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>{
      const r=stage.getBoundingClientRect();
      stage.style.setProperty('--tilt-x',`${(0.5-(event.clientY-r.top)/r.height)*4}deg`);
      stage.style.setProperty('--tilt-y',`${((event.clientX-r.left)/r.width-0.5)*6}deg`);
    });
  });
  stage.addEventListener('pointerleave',()=>{
    cancelAnimationFrame(frame);
    stage.style.removeProperty('--tilt-x');
    stage.style.removeProperty('--tilt-y');
  });
})();
