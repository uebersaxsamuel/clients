function getLocalizedSearchUrl(baseUrl, query) {
  const lang = document.documentElement.lang;
  const prefix = lang === 'de' ? '/de' : lang === 'en' ? '/en' : '';
  return `${prefix}${baseUrl}${encodeURIComponent(query)}`;
}

const tn='[search="form-block"]',
      en='[search="form"]',
      rn='[search="component"]',
      nn='[search="other-elements"], .search-modal_close-button',
      on='[search="icon"]',
      an='[search="icon-mount"]',
      cn='[search="input"]',
      un='[search="button-wrapper"]',
      sn='[search="modal-content-wrapper"]',
      fn='[search="alternative-background"]',
      pn='[nav="component"]',
      hn="/search?query=",
      mn="#eb145c",
      dn="#000",
      yn=.5,
      vn=1.5,
      gn=1.2,
      bn=.3,
      wn="zoomed",
      Sn="#f8f9d6",
      Tn="search-data-href-base",
      En="search-data-error-color",
      On="search-data-resolved-error-color",
      jn="search-data-showing-error-animation-time",
      kn="search-data-resolving-error-animation-time",
      Ln="search-data-main-animation-time",
      An="search-data-magnifier-fade-out-time",
      Fn="search-data-zoomed-class",
      xn="search-data-animation-background-color";

function Cn(){
  const t=document.querySelectorAll(rn),
        e=document.querySelectorAll(nn),
        r=[];
  t.forEach(t=>{
    const e={
      component:t,
      formBlock:t.querySelector(tn),
      form:t.querySelector(en),
      icon:t.querySelector(on),
      iconMount:document.querySelector(pn).querySelector(fn).querySelector(an),
      input:t.querySelector(cn),
      buttonWrapper:t.querySelector(un),
      animationBackground:t.closest(sn)||!1,
      data:{componentInNav:!0}
    };
    if(!1===e.animationBackground){
      const r=t.querySelector(ln);
      e.animationBackground=r;
      const n=t.closest("section");
      null!==n.querySelector(fn)&&(e.animationBackground=n.querySelector(fn)),
      e.data.componentInNav=!1,
      e.iconMount=e.animationBackground.querySelector(an)
    }
    r.push(e);
  });
  return{
    nav:document.querySelector(pn),
    searchInstances:r,
    otherElements:e
  };
}

function In(t){
  const e=t.searchInstances[0].component;
  return{
    searchHrefBase:e.getAttribute(Tn)||hn,
    errorColor:e.getAttribute(En)||mn,
    resolvedErrorColor:e.getAttribute(On)||dn,
    errorAnimationTime:parseFloat(e.getAttribute(jn)||yn),
    resolvingAnimationTime:parseFloat(e.getAttribute(kn)||vn),
    mainAnimationTime:parseFloat(e.getAttribute(Ln)||gn),
    magnifierFadeOutTime:parseFloat(e.getAttribute(An)||bn),
    animatedStateClass:e.getAttribute(Fn)||wn,
    animationBackgroundColor:parseFloat(e.getAttribute(xn)||Sn)
  };
}

const Pn=(t,e=["load"],r=window)=>{
  ("string"!=typeof e
    ? (e.forEach(e=>r.addEventListener(e,t)))
    : r.addEventListener(e,t));
};

const Bn={}, Mn=()=>{const t=Bn;t.elements=Cn(),t.styles=In(t.elements)};

var _n=new class{
  init(t){
    const e=this;
    this.#t=t.styles;
    (this.#e=t.elements).searchInstances.forEach((t,r)=>{
      t.form.onkeypress=function(t){
        13==(t.charCode||t.keyCode||0)&&(t.preventDefault(),e.#r(r))
      };
      this.addHandler(()=>{e.#r(r)},"click",t.buttonWrapper)
    })
  }

  #e;
  #t;
  #n;
  #o=!1;

  #r(t){
    const e=this.#e.searchInstances[t],
          r=this.#t;
    if(""===e.input.value){
      "object"==typeof this.#n ? this.#n.clear() : this.#n=gsap.timeline();
      const t=this.#n;
      return t.set(e.formBlock,{borderColor:r.errorColor,color:r.errorColor}),
             t.to(e.formBlock,{borderColor:r.resolvedErrorColor,color:r.resolvedErrorColor,duration:r.resolvingAnimationTime},`+=${r.errorAnimationTime}`),
             void t.set(e.formBlock,{borderColor:"",color:""});
    }
    this.#o || (this.#o=!0,this.#i(t))
  }

  #a(t,e){t.parentNode.insertBefore(e,t.nextSibling)}

  #c(t){
    const e=window.getComputedStyle(t),
          r=new DOMMatrixReadOnly(e.transform);
    return{scale:r.a,translateX:r.m41,translateY:r.m42}
  }

  #i(t){
    const e=this.#e.searchInstances[t],
          r=this.#t,
          n=this.#e,
          o=Object.fromEntries(new FormData(e.form).entries()).Search,
          i=getLocalizedSearchUrl(r.searchHrefBase, o); // <- Lokalisierte URL

    gsap.to(n.otherElements,{opacity:0,duration:r.mainAnimationTime/2});
    const a=Flip.getState(e.formBlock);
    e.formBlock.classList.add(r.animatedStateClass);
    const c=this.#c(e.formBlock);
    Flip.from(a,{duration:r.mainAnimationTime});
    gsap.to(e.formBlock,{x:c.translateX,scale:c.scale,opacity:0,duration:r.mainAnimationTime});

    const u=Flip.getState(e.icon);
    this.#a(e.iconMount,e.icon);
    e.icon.classList.add(r.animatedStateClass);
    Flip.from(u,{duration:r.mainAnimationTime});

    if(!e.data.componentInNav){
      gsap.set(e.animationBackground,{opacity:0,display:"block"});
      gsap.fromTo(e.icon,{scale:0,opacity:0},{scale:1,opacity:1,duration:r.mainAnimationTime});
    }

    gsap.timeline().to(e.icon,{opacity:0,duration:r.magnifierFadeOutTime}).delay(r.mainAnimationTime - r.magnifierFadeOutTime);
    gsap.to(e.animationBackground,{backgroundColor:r.animationBackgroundColor,opacity:1,duration:r.mainAnimationTime});

    setTimeout(()=>{window.location.href = i}, 1e3 * r.mainAnimationTime);
  }

  addHandler(t,e=["load"],r=window){Pn(t,e,r)}
};

(function(t){
  function e(){
    "undefined"==typeof Flip
      ? $.loadScript("https://cdn.jsdelivr.net/gh/BarthMedia/js@main/Flip.min.js",()=>r())
      : r();
  }

  function r(){
    gsap.registerPlugin(Flip);
    t();
  }

  "undefined"==typeof gsap
    ? $.loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js",()=>e())
    : e();
})(function(){
  Mn();
  _n.init(Bn);
});
