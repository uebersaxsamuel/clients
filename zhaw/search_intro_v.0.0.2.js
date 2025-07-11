
function getLocalizedSearchUrl(baseUrl, query) {
  const l = document.documentElement.lang;
  const prefix = l === 'de' ? '/de' : l === 'en' ? '/en' : '';
  const params = new URLSearchParams({ Search: query }).toString();
  if (baseUrl.startsWith('/')) return `${prefix}${baseUrl}?${params}`;
  const u = new URL(baseUrl, location.origin);
  u.pathname = prefix + u.pathname;
  u.search = params;
  return u.href;
}

if (typeof _n !== 'undefined') {
  const originalInit = _n.init;
  _n.init = function (t) {
    const proto = this.constructor.prototype;
    const original_r = this['#r'];
    this['#r'] = function (i) {
      const e = this['#e'].searchInstances[i], r = this['#t'];
      if (!e?.input?.value) {
        if (typeof this['#n'] === 'object') this['#n'].clear();
        else this['#n'] = gsap.timeline();
        const tl = this['#n'];
        tl.set(e.formBlock, { borderColor: r.errorColor, color: r.errorColor });
        tl.to(e.formBlock, { borderColor: r.resolvedErrorColor, color: r.resolvedErrorColor, duration: r.resolvingAnimationTime }, `+=${r.errorAnimationTime}`);
        tl.set(e.formBlock, { borderColor: "", color: "" });
        return;
      }

      if (this['#o']) return;
      this['#o'] = true;

      const query = new FormData(e.form).get('Search');
      const localizedUrl = getLocalizedSearchUrl(r.searchHrefBase, query);

      gsap.to(this['#e'].otherElements, { opacity: 0, duration: r.mainAnimationTime / 2 });

      const flipState = Flip.getState(e.formBlock);
      e.formBlock.classList.add(r.animatedStateClass);
      const tf = this['#c'](e.formBlock);
      Flip.from(flipState, { duration: r.mainAnimationTime });
      gsap.to(e.formBlock, { x: tf.translateX, scale: tf.scale, opacity: 0, duration: r.mainAnimationTime });

      const iconState = Flip.getState(e.icon);
      this['#a'](e.iconMount, e.icon);
      e.icon.classList.add(r.animatedStateClass);
      Flip.from(iconState, { duration: r.mainAnimationTime });

      if (!e.data.componentInNav) {
        gsap.set(e.animationBackground, { opacity: 0, display: "block" });
        gsap.fromTo(e.icon, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: r.mainAnimationTime });
      }

      gsap.timeline().to(e.icon, { opacity: 0, duration: r.magnifierFadeOutTime }).delay(r.mainAnimationTime - r.magnifierFadeOutTime);
      gsap.to(e.animationBackground, { backgroundColor: r.animationBackgroundColor, opacity: 1, duration: r.mainAnimationTime });

      setTimeout(() => {
        console.log("Redirecting to:", localizedUrl);
        window.location.assign(localizedUrl);
      }, r.mainAnimationTime * 1000);
    };
    originalInit.call(this, t);
  };
}
console.log("🌍 Lokalisierte Such-Weiterleitung aktiviert");

