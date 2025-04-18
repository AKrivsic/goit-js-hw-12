import{a as w,S as b,i}from"./assets/vendor-Db2TdIkw.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const S="49742817-2a5c8f84523d00bf5c0bae38f",q="https://pixabay.com/api/";async function u(o,r){const e={key:S,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15};return(await w.get(q,{params:e})).data}const f=document.querySelector(".gallery"),p=document.querySelector(".loader"),m=document.querySelector(".load-more"),P=new b(".gallery a",{captionsData:"alt",captionPosition:"bottom"});function h(o){const r=o.map(e=>`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <p class="info-title">Likes</p>
          <p class="info-value">${e.likes}</p>
        </div>
        <div class="info-item">
          <p class="info-title">Views</p>
          <p class="info-value">${e.views}</p>
        </div>
        <div class="info-item">
          <p class="info-title">Comments</p>
          <p class="info-value">${e.comments}</p>
        </div>
        <div class="info-item">
          <p class="info-title">Downloads</p>
          <p class="info-value">${e.downloads}</p>
        </div>
      </div>
    </li>
  `).join("");f.insertAdjacentHTML("beforeend",r),P.refresh()}function E(){f.innerHTML=""}function y(){p.classList.add("visible")}function g(){p.classList.remove("visible")}function v(){m.classList.remove("hidden")}function c(){m.classList.add("hidden")}const L=document.querySelector(".form"),B=L.elements["search-text"],$=document.querySelector(".load-more");let M="",a=1,d=0;L.addEventListener("submit",async o=>{o.preventDefault();const r=B.value.trim();if(a=1,!r){i.warning({title:"Warning",message:"Please enter a search term."});return}E(),y(),c();try{const e=await u(r,a);if(d=e.totalHits,e.hits.length===0){i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}h(e.hits),e.hits.length<d&&v()}catch(e){i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(e)}finally{g()}});$.addEventListener("click",async()=>{a+=1,y(),c();try{const o=await u(M,a);h(o.hits),a*15>=d?(c(),i.info({title:"End of results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):v(),R()}catch(o){i.error({title:"Error",message:"Failed to load more images."}),console.error(o)}finally{g()}});function R(){const{height:o}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
