// Ergänzung für die URL-Lokalisierung
function getLocalizedSearchUrl(baseUrl, query) {
    const currentUrl = window.location.href;
    const currentPath = window.location.pathname;
    
    // Prüfe ob aktuelle URL DE oder EN enthält
    const isGerman = currentUrl.includes('/de/') || 
                     currentPath.startsWith('/de/') || 
                     currentUrl.includes('/de') ||
                     document.documentElement.lang === 'de' ||
                     document.querySelector('html[lang="de"]');
    
    const isEnglish = currentUrl.includes('/en/') || 
                      currentPath.startsWith('/en/') || 
                      currentUrl.includes('/en') ||
                      document.documentElement.lang === 'en' ||
                      document.querySelector('html[lang="en"]');
    
    // Bestimme Sprach-Präfix
    let langPrefix = '';
    if (isGerman) {
        langPrefix = '/de';
    } else if (isEnglish) {
        langPrefix = '/en';
    }
    
    // Baue lokalisierte URL
    if (baseUrl.startsWith('/')) {
        return langPrefix + baseUrl + query;
    } else {
        // Absolute URL - füge Sprache vor /search hinzu
        const url = new URL(baseUrl + query, window.location.origin);
        if (langPrefix) {
            url.pathname = langPrefix + url.pathname;
        }
        return url.href;
    }
}

// Modifikation der ursprünglichen #r Methode
const originalSearchMethod = _n.constructor.prototype.constructor.prototype;

// Überschreibe die URL-Generierung im ursprünglichen Code
if (typeof _n !== 'undefined') {
    const originalInit = _n.init;
    _n.init = function(t) {
        const originalMethod = this.constructor.prototype;
        
        // Speichere ursprüngliche #r Methode
        const original_r = this['#r'] || function() {};
        
        // Überschreibe #r Methode mit Lokalisierung
        this['#r'] = function(t) {
            const e = this['#e'].searchInstances[t],
                  r = this['#t'];
            
            if (""===e.input.value) {
                // Fehlerbehandlung bleibt gleich
                if ("object"==typeof this['#n']) this['#n'].clear();
                else this['#n']=gsap.timeline();
                
                const timeline = this['#n'];
                timeline.set(e.formBlock,{borderColor:r.errorColor,color:r.errorColor});
                timeline.to(e.formBlock,{borderColor:r.resolvedErrorColor,color:r.resolvedErrorColor,duration:r.resolvingAnimationTime},`+=${r.errorAnimationTime}`);
                timeline.set(e.formBlock,{borderColor:"",color:""});
                return;
            }
            
            if (this['#o']) return;
            this['#o'] = true;
            
            // Hole Suchanfrage
            const query = Object.fromEntries(new FormData(e.form).entries()).Search;
            
            // Generiere lokalisierte URL
            const localizedUrl = getLocalizedSearchUrl(r.searchHrefBase, query);
            
            // Führe Animation aus (wie im Original)
            const elements = this['#e'];
            gsap.to(elements.otherElements,{opacity:0,duration:r.mainAnimationTime/2});
            
            const flipState = Flip.getState(e.formBlock);
            e.formBlock.classList.add(r.animatedStateClass);
            
            const transform = this['#c'](e.formBlock);
            Flip.from(flipState,{duration:r.mainAnimationTime});
            gsap.to(e.formBlock,{x:transform.translateX,scale:transform.scale,opacity:0,duration:r.mainAnimationTime});
            
            const iconState = Flip.getState(e.icon);
            this['#a'](e.iconMount,e.icon);
            e.icon.classList.add(r.animatedStateClass);
            Flip.from(iconState,{duration:r.mainAnimationTime});
            
            if (!e.data.componentInNav) {
                gsap.set(e.animationBackground,{opacity:0,display:"block"});
                gsap.fromTo(e.icon,{scale:0,opacity:0},{scale:1,opacity:1,duration:r.mainAnimationTime});
            }
            
            gsap.timeline().to(e.icon,{opacity:0,duration:r.magnifierFadeOutTime}).delay(r.mainAnimationTime-r.magnifierFadeOutTime);
            gsap.to(e.animationBackground,{backgroundColor:r.animationBackgroundColor,opacity:1,duration:r.mainAnimationTime});
            
            // Verwende lokalisierte URL für Weiterleitung
            setTimeout(function(){
                window.location.href = localizedUrl;
            }, 1000 * r.mainAnimationTime);
        };
        
        // Rufe ursprüngliche init Methode auf
        originalInit.call(this, t);
    };
}

console.log('Search URL Lokalisierung geladen');
