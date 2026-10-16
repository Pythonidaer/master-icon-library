import React,{useEffect,useRef,useState} from 'react';

// Adapted from design-practice's nonmodal disclosure: one link list,
// frosted sticky header, solid dropdown, and no page scroll lock.
export function SiteHeader({view,savedOnly,savedCount,onHome,onConsiderations,onSaved}){
 const header=useRef(null),trigger=useRef(null);
 const [compact,setCompact]=useState(()=>window.matchMedia('(max-width: 1080px)').matches);
 const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(()=>window.scrollY>8);
 useEffect(()=>{
  const media=window.matchMedia('(max-width: 1080px)');
  const resize=()=>{setCompact(media.matches);setOpen(false)};
  const scroll=()=>setScrolled(window.scrollY>8);
  media.addEventListener('change',resize);
  window.addEventListener('scroll',scroll,{passive:true});
  return()=>{media.removeEventListener('change',resize);window.removeEventListener('scroll',scroll)};
 },[]);
 useEffect(()=>{
  if(!compact||!open)return;
  const outside=event=>{if(!header.current?.contains(event.target))setOpen(false)};
  const escape=event=>{if(event.key==='Escape'){event.preventDefault();setOpen(false);trigger.current?.focus({preventScroll:true})}};
  document.addEventListener('pointerdown',outside);
  document.addEventListener('focusin',outside);
  document.addEventListener('keydown',escape);
  return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('focusin',outside);document.removeEventListener('keydown',escape)};
 },[compact,open]);
 function navigate(action){setOpen(false);action();if(compact)trigger.current?.focus({preventScroll:true})}
 const expanded=compact&&open;
 return <header ref={header} className={'site-header'+(scrolled?' is-scrolled':'')}>
  <button className="brand" onClick={()=>navigate(onHome)} aria-label="Master Icon Library home">Master Icon Library</button>
  <button ref={trigger} className="nav-toggle" type="button" aria-controls="main-navigation" aria-expanded={expanded} aria-label={expanded?'Close navigation':'Open navigation'} onClick={()=>setOpen(value=>!value)}>
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false"><path className="nav-line nav-line-top" d="M4 6.5h16"/><path className="nav-line nav-line-middle" d="M4 12h16"/><path className="nav-line nav-line-bottom" d="M4 17.5h16"/></svg>
  </button>
  <nav id="main-navigation" className={'site-navigation'+(expanded?' is-open':'')} aria-label="Main navigation" inert={compact&&!expanded} aria-hidden={compact&&!expanded?true:undefined}>
   <button aria-current={view==='collections'&&!savedOnly?'page':undefined} onClick={()=>navigate(onHome)}>Libraries</button>
   <button aria-current={view==='considerations'?'page':undefined} onClick={()=>navigate(onConsiderations)}>Considerations</button>
   <button aria-current={savedOnly?'page':undefined} onClick={()=>navigate(onSaved)}>Saved <span className="badge">{savedCount}</span></button>
   <a href="https://icon-sets.iconify.design/" target="_blank" rel="noreferrer" onClick={()=>setOpen(false)}>Icon sources</a>
   <a href="https://github.com/Pythonidaer/master-icon-library" target="_blank" rel="noreferrer" onClick={()=>{setOpen(false);if(compact)trigger.current?.focus({preventScroll:true})}}>GitHub</a>
  </nav>
 </header>;
}
