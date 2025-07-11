
function getLocalizedSearchUrl(base, q) {
  const p = location.pathname, l = document.documentElement.lang;
  const pre = p.includes('/de') || l === 'de' ? '/de' : p.includes('/en') || l === 'en' ? '/en' : '';
  const param = new URLSearchParams({ Search: q }).toString();
  if (base.startsWith('/')) return pre + base + '?' + param;
  const u = new URL(base, location.origin);
  u.pathname = pre + u.pathname;
  u.search = param;
  return u.href;
}

if (typeof _n !== 'undefined') {
  const origInit = _n.init;
  _n.init = function(t) {
    const origProto = this.constructor.prototype;
    const orig_r = this['#r'] || function() {};
    this['#r'] = function(t) {
      const e = this['#e'].searchInstances[t], r = this['#t'];
      if ("" === e.input.value) {
        if ("object" == typeof this['#n']) this['#n'].clear();
        else this['#n'] = gsap.timeline();
        const tl = this['#n'];
        tl.set(e.formBlock, {borderColor: r.errorColor, color: r.errorColor});
        tl.to(e.formBlock, {borderColor: r.resolvedErrorColor, color: r.resolvedErrorColor, duration: r.resolvingAnimationTime}, `+=${r.errorAnimationTime}`);
        tl.set(e.formBlock, {borderColor: "", color: ""});
        return;
      }
      if (this['#o']) return;
      this['#o'] = true;
      const q = Object.fromEntries(new FormData(e.form).entries()).Search;
      const url = getLocalizedSearchUrl(r.searchHrefBase, q);
      gsap.to(this['#e'].otherElements, {opacity: 0, duration: r.mainAnimationTime/2});
      const flip = Flip.getState(e.formBlock);
      e.formBlock.classList.add(r.animatedStateClass);
      const tf = this['#c'](e.formBlock);
      Flip.from(flip, {duration: r.mainAnimationTime});
      gsap.to(e.formBlock, {x: tf.translateX, scale: tf.scale, opacity: 0, duration: r.mainAnimationTime});
      const iconFlip = Flip.getState(e.icon);
      this['#a'](e.iconMount, e.icon);
      e.icon.classList.add(r.animatedStateClass);
      Flip.from(iconFlip, {duration: r.mainAnimationTime});
      if (!e.data.componentInNav) {
        gsap.set(e.animationBackground, {opacity: 0, display: "block"});
        gsap.fromTo(e.icon, {scale: 0, opacity: 0}, {scale: 1, opacity: 1, duration: r.mainAnimationTime});
      }
      gsap.timeline().to(e.icon, {opacity: 0, duration: r.magnifierFadeOutTime}).delay(r.mainAnimationTime - r.magnifierFadeOutTime);
      gsap.to(e.animationBackground, {backgroundColor: r.animationBackgroundColor, opacity: 1, duration: r.mainAnimationTime});
      setTimeout(() => {
        console.log('Redirecting to:', url);
        window.location.assign(url);
      }, 1e3 * r.mainAnimationTime);
    };
    origInit.call(this, t);
  };
}
console.log('Webflow Localized Search Redirect loaded');
