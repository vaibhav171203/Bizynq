(function(){
  var C = window.BIZYNQ || {};
  var wa = "https://wa.me/" + (C.whatsapp || "") + "?text=" + encodeURIComponent(C.waMessage || "");
  document.querySelectorAll("[data-wa]").forEach(function(a){ a.href = wa; a.target = "_blank"; a.rel = "noopener"; });

  document.querySelectorAll("[data-book]").forEach(function(a){
    if(C.calendly){ a.href = C.calendly; a.target = "_blank"; a.rel = "noopener"; }
  });

  function fill(key, linkFn){
    document.querySelectorAll('[data-contact="'+key+'"]').forEach(function(el){
      if(C[key]){ el.textContent = C[key]; if(linkFn && el.tagName==="A") el.href = linkFn(C[key]); }
      else if(key==="hours"){ var li=el.closest("li"); if(li) li.style.display="none"; }
      else { el.textContent = "[Add " + key + "]"; if(el.tagName==="A") el.removeAttribute("href"); }
    });
  }
  fill("phone", function(v){ return "tel:" + v.replace(/[^+\d]/g,""); });
  fill("email", function(v){ return "mailto:" + v; });
  fill("address"); fill("hours");

  document.querySelectorAll("[data-year]").forEach(function(el){ el.textContent = new Date().getFullYear(); });

  var t = document.querySelector(".nav-toggle"), l = document.querySelector(".nav-links");
  if(t && l){ t.addEventListener("click", function(){ var o = l.classList.toggle("open"); t.setAttribute("aria-expanded", o); }); }

  var p = new URLSearchParams(location.search).get("service");
  if(p){ document.querySelectorAll('select[name="service"]').forEach(function(s){
    Array.prototype.forEach.call(s.options, function(o){ if(o.value===p) s.value = p; });
  }); }

  if(C.gaId){
    var s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + C.gaId;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", C.gaId);
  }
})();
