import{a as y,S as v,i as d}from"./assets/vendor-f144e563.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const L="https://pixabay.com/api/",w="31000801-179358ed9db1a9fc0904af43d";async function p(s,t){return(await y.get(L,{params:{key:w,image_type:"photo",orientation:"horizontal",safesearch:!0,q:s,page:t,per_page:15}})).data}function m(s=[]){return s.map(({webformatURL:t,largeImageURL:a,tags:l,likes:e,views:r,comments:c,downloads:h})=>`
        <li class="gallery-item">
          <a href="${a}" class="gallery-link">
            <div class="card-wrapper-img">
              <img
                class="card-img"
                src="${t}"
                alt="${l}"
              />
            </div>
            <div class="card-info">
              <div class="card-info-colum">
                <p class="card-info-title">likes</p>
                <p class="card-info-value">${e}</p>
              </div>
              <div class="card-info-colum">
                <p class="card-info-title">views</p>
                <p class="card-info-value">${r}</p>
              </div>
              <div class="card-info-colum">
                <p class="card-info-title">comments</p>
                <p class="card-info-value">${c}</p>
              </div>
              <div class="card-info-colum">
                <p class="card-info-title">downloads</p>
                <p class="card-info-value">${h}</p>
              </div>
            </div>
          </a>
        </li>`).join("")}const g=new v(".gallery a",{captionsData:"alt",captionDelay:250}),b=document.querySelector(".search-form"),u=document.querySelector(".gallery"),o=document.querySelector(".load-more");let f=document.querySelector(".preloader"),n="",i=1;o.classList.add("hidden");async function S(s){if(s.preventDefault(),n=s.target.elements.message.value.trim(),s.target.reset(),n!==""){f.classList.add("show"),u.innerHTML="",i=1;try{const{hits:t,totalHits:a}=await p(n,i);if(t.length===0){d.info({message:"Sorry, there are no images matching your search query. Please try again!"}),o.classList.add("hidden");return}u.innerHTML=m(t),g.refresh(),o.classList.toggle("hidden",a<=i*15)}catch(t){d.error({message:t.message})}finally{f.classList.remove("show")}}}async function q(){i+=1,f.classList.add("show");try{const{hits:s,totalHits:t}=await p(n,i);if(s.length===0){d.info({message:"We're sorry, but you've reached the end of search results."}),o.classList.add("hidden");return}u.insertAdjacentHTML("beforeend",m(s)),g.refresh(),o.classList.toggle("hidden",t<=i*15),window.scrollBy({top:u.firstElementChild.getBoundingClientRect().height*2,behavior:"smooth"})}catch(s){d.error({message:s.message})}finally{f.classList.remove("show")}}b.addEventListener("submit",S);o.addEventListener("click",q);
//# sourceMappingURL=commonHelpers.js.map
