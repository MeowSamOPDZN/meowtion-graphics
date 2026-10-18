/* Shared site chrome: template cards + preview thumbnails */
(function () {
  var grid = document.getElementById("homeGrid") || document.getElementById("allGrid");
  if (!grid || typeof TEMPLATES === "undefined") return;

  var sample = { brand: "Acme", headline: "Launch day is here", sub: "The fastest way to ship your idea.", cta: "Get started", c1: "#7c5cff", c2: "#ff7ad9", logo: "" };

  function card(t) {
    var aspect = t.aspects[0];
    var r = renderTemplate(t.id, sample, aspect);
    var el = document.createElement("div");
    el.className = "tcard";
    el.dataset.cat = t.cat;
    el.dataset.aspect = t.aspects.join(",");
    el.innerHTML =
      "<div class='prev" + (aspect === "9:16" ? " vert" : "") + "'>" + r.svg + "</div>" +
      "<div class='body'><h3>" + t.name + "</h3>" +
      "<div class='meta'>" + t.aspects.join(" · ") + " · " + t.duration + "s</div>" +
      "<p>" + t.desc + "</p>" +
      "<a class='make' href='/make?template=" + t.id + "'>Make a video like this →</a></div>";
    return el;
  }

  function renderAll(list) {
    grid.innerHTML = "";
    list.forEach(function (t) { grid.appendChild(card(t)); });
  }

  if (document.getElementById("homeGrid")) {
    renderAll(TEMPLATES.slice(0, 6));
  } else {
    var chips = document.querySelectorAll(".chip");
    function apply() {
      var on = document.querySelector(".chip.on");
      var f = on ? on.dataset.f : "all";
      renderAll(TEMPLATES.filter(function (t) {
        if (f === "all") return true;
        if (f === "wide") return t.aspects.indexOf("16:9") > -1;
        if (f === "vert") return t.aspects.indexOf("9:16") > -1;
        return t.cat === f;
      }));
    }
    chips.forEach(function (c) { c.addEventListener("click", function () { chips.forEach(function (x) { x.classList.remove("on"); }); c.classList.add("on"); apply(); }); });
    apply();
  }
})();
