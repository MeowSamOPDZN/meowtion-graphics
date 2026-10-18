/* Meowtion Graphics maker: pick template -> brief -> AI copy -> preview -> export */
(function () {
  "use strict";
  var qs = new URLSearchParams(location.search);
  var state = {
    templateId: qs.get("template") || "ember",
    aspect: "16:9",
    params: { brand: "", headline: "", sub: "", cta: "", c1: "#7c5cff", c2: "#ff7ad9", logo: "" },
    last: null
  };
  var grid = document.getElementById("pickgrid");
  var stage = document.getElementById("stage");
  var statusEl = document.getElementById("status");

  function setStatus(html) { statusEl.innerHTML = html || ""; }

  function tpl(id) {
    for (var i = 0; i < TEMPLATES.length; i++) if (TEMPLATES[i].id === id) return TEMPLATES[i];
    return TEMPLATES[0];
  }

  function renderPicker() {
    grid.innerHTML = "";
    var sample = Object.assign({}, state.params, { brand: "Acme", headline: "Launch day", sub: "Ship your idea faster.", cta: "Get started" });
    TEMPLATES.forEach(function (t) {
      var r = renderTemplate(t.id, sample, t.aspects.indexOf(state.aspect) > -1 ? state.aspect : t.aspects[0]);
      var d = document.createElement("div");
      d.className = "pick" + (t.id === state.templateId ? " on" : "");
      d.innerHTML = r.svg + "<div class='nm'>" + t.name + " · " + r.duration + "s</div>";
      d.title = t.desc;
      d.onclick = function () { state.templateId = t.id; renderPicker(); renderPreview(); };
      grid.appendChild(d);
    });
  }

  function renderPreview() {
    var r = renderTemplate(state.templateId, state.params, state.aspect);
    stage.innerHTML = r.svg;
    state.last = r;
    if (state.params.headline) document.getElementById("editBox").style.display = "block";
  }

  document.querySelectorAll("#aspectRow .chip").forEach(function (c) {
    c.addEventListener("click", function () {
      document.querySelectorAll("#aspectRow .chip").forEach(function (x) { x.classList.remove("on"); });
      c.classList.add("on");
      state.aspect = c.dataset.a;
      renderPicker(); renderPreview();
    });
  });
  // default aspect to template's first if 16:9 unsupported
  function syncAspect() {
    var t = tpl(state.templateId);
    if (t.aspects.indexOf(state.aspect) === -1) {
      state.aspect = t.aspects[0];
      document.querySelectorAll("#aspectRow .chip").forEach(function (x) { x.classList.toggle("on", x.dataset.a === state.aspect); });
    }
  }

  document.getElementById("logo").addEventListener("change", function (e) {
    var f = e.target.files[0];
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function () { state.params.logo = rd.result; renderPreview(); };
    rd.readAsDataURL(f);
  });

  ["brand", "c1", "c2"].forEach(function (k) {
    document.getElementById(k).addEventListener("input", function (e) {
      state.params[k] = e.target.value;
      if (state.params.headline) renderPreview();
    });
  });

  document.getElementById("genBtn").addEventListener("click", function () {
    var brief = document.getElementById("brief").value.trim();
    var brand = document.getElementById("brand").value.trim() || "Your Brand";
    if (!brief) { setStatus("Write a short brief first — one or two sentences is plenty."); return; }
    syncAspect();
    state.params.brand = brand;
    state.params.c1 = document.getElementById("c1").value;
    state.params.c2 = document.getElementById("c2").value;
    setStatus("<span class='spinner'></span>AI is writing your copy…");
    fetch("/api/customize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        template: state.templateId, aspect: state.aspect,
        brief: brief, brand: brand,
        c1: state.params.c1, c2: state.params.c2
      })
    }).then(function (r) { return r.json(); }).then(function (d) {
      if (d.error) { setStatus("Couldn't generate copy: " + d.error); return; }
      state.params.headline = d.headline || "Your headline here";
      state.params.sub = d.sub || "";
      state.params.cta = d.cta || "Learn more";
      document.getElementById("fHead").value = state.params.headline;
      document.getElementById("fSub").value = state.params.sub;
      document.getElementById("fCta").value = state.params.cta;
      setStatus("Done — tweak the copy if you like, then download.");
      renderPreview();
    }).catch(function () { setStatus("The AI didn't respond. Check your connection and try again."); });
  });

  document.getElementById("applyBtn").addEventListener("click", function () {
    state.params.headline = document.getElementById("fHead").value;
    state.params.sub = document.getElementById("fSub").value;
    state.params.cta = document.getElementById("fCta").value;
    renderPreview();
  });

  document.getElementById("dlBtn").addEventListener("click", function () {
    var r = state.last;
    if (!r) return;
    setStatus("<span class='spinner'></span>Recording your video…");
    exportWebM(r).then(function (blob) {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "meowtion-" + state.templateId + ".webm";
      a.click();
      setStatus("Downloaded. Yours, no watermark.");
    }).catch(function () { setStatus("Export failed in this browser — try Chrome or Edge."); });
  });

  function exportWebM(r) {
    return new Promise(function (resolve, reject) {
      var svgBlob = new Blob([r.svg], { type: "image/svg+xml;charset=utf-8" });
      var url = URL.createObjectURL(svgBlob);
      var img = new Image();
      img.onload = function () {
        try {
          var canvas = document.createElement("canvas");
          canvas.width = r.width; canvas.height = r.height;
          var ctx = canvas.getContext("2d");
          var stream = canvas.captureStream(30);
          var mime = "video/webm;codecs=vp9";
          if (!window.MediaRecorder || !MediaRecorder.isTypeSupported(mime)) mime = "video/webm";
          var rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 8000000 });
          var chunks = [];
          rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
          rec.onerror = function () { reject(new Error("rec")); };
          rec.onstop = function () { resolve(new Blob(chunks, { type: "video/webm" })); };
          rec.start(200);
          var t0 = performance.now(), durMs = r.duration * 1000;
          (function frame() {
            ctx.drawImage(img, 0, 0, r.width, r.height);
            if (performance.now() - t0 < durMs) requestAnimationFrame(frame);
            else setTimeout(function () { rec.stop(); }, 300);
          })();
        } catch (e) { reject(e); }
      };
      img.onerror = function () { reject(new Error("img")); };
      img.src = url;
    });
  }

  syncAspect();
  renderPicker();
  renderPreview();
})();
