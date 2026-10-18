/* Meowtion Graphics — original animated SVG templates (v2).
   Hand-built kinetic-type motion graphics: massive staggered typography,
   sticker pills, layered glow/shape scenes, crossfading scenes.
   All original code — no external assets. SMIL only, so each SVG plays
   inline AND inside an <img> for WebM export.
   render(id, params, aspect) -> { svg, duration } */

var __uid = 0;
function uid() { return "m" + (++__uid) + "_"; }

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function clip(s, n) { s = String(s || ""); return s.length > n ? s.slice(0, n - 1) + "…" : s; }
var FONT = "font-family='-apple-system,BlinkMacSystemFont,Segoe UI,Inter,Helvetica,Arial,sans-serif'";

var EASE = "calcMode='spline' keySplines='0.2 0.9 0.25 1'";
var EASE_OUT = "calcMode='spline' keySplines='0.16 1 0.3 1'";

/* rise+fade entrance used by almost everything */
function rise(inner, dy, dur, begin) {
  return "<g opacity='0'>" + inner +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='" + dur + "s' begin='" + begin + "s' fill='freeze'/>" +
    "<animateTransform attributeName='transform' type='translate' values='0 " + dy + ";0 0' keyTimes='0;1' " + EASE + " dur='" + dur + "s' begin='" + begin + "s' fill='freeze'/></g>";
}

/* stacked giant words, staggered rise — the kinetic-type workhorse */
function wordStack(text, cx, yTop, size, fill, begin, maxW) {
  var words = clip(text, 40).split(/\s+/).slice(0, maxW || 3);
  var s = "", y = yTop;
  for (var i = 0; i < words.length; i++) {
    s += rise("<text " + FONT + " x='" + cx + "' y='" + y + "' text-anchor='middle' font-size='" + size +
      "' font-weight='900' letter-spacing='-3' fill='" + fill + "'>" + esc(words[i].toUpperCase()) + "</text>",
      size * 0.45, 0.55, begin + i * 0.16);
    y += size * 1.02;
  }
  return { svg: s, bottom: y };
}

/* single-line headline with a wipe reveal */
function wipeLine(text, cx, y, size, fill, begin, VW, align) {
  var id = uid();
  var w = Math.min(VW * 0.9, String(text).length * size * 0.62);
  var x0 = align === "start" ? cx : cx - w / 2;
  return "<clipPath id='" + id + "'><rect x='" + x0 + "' y='" + (y - size) + "' width='0' height='" + size * 1.25 + "'>" +
    "<animate attributeName='width' from='0' to='" + w + "' dur='0.7s' begin='" + begin + "s' " + EASE + " fill='freeze'/></rect></clipPath>" +
    "<text " + FONT + " x='" + (align === "start" ? cx : cx) + "' y='" + y + "' text-anchor='" + (align === "start" ? "start" : "middle") +
    "' font-size='" + size + "' font-weight='900' letter-spacing='-2' fill='" + fill + "' clip-path='url(#" + id + ")'>" + esc(clip(text, 36)) + "</text>";
}

/* sticker pill that pops in with overshoot */
function sticker(cx, cy, label, fill, lc, rot, begin, fs, pw) {
  fs = fs || 34;
  var w = pw || (String(label).length * fs * 0.68 + fs * 1.6), h = fs * 1.9;
  return "<g transform='translate(" + cx + " " + cy + ") rotate(" + rot + ")'><g>" +
    "<rect x='" + (-w / 2) + "' y='" + (-h / 2) + "' width='" + w + "' height='" + h + "' rx='" + h / 2 + "' fill='" + fill + "'/>" +
    "<text " + FONT + " x='0' y='" + fs * 0.36 + "' text-anchor='middle' font-size='" + fs + "' font-weight='800' letter-spacing='1' fill='" + lc + "'>" + esc(clip(label, 20).toUpperCase()) + "</text>" +
    "<animateTransform attributeName='transform' type='scale' values='0;1.14;1' keyTimes='0;0.6;1' calcMode='spline' keySplines='0.2 0.9 0.3 1.3;0.2 0.8 0.3 1' dur='0.5s' begin='" + begin + "s' fill='freeze'/></g></g>";
}

/* drifting glow clouds */
function clouds(VW, VH, yBase, colors, seed) {
  var s = "";
  for (var i = 0; i < 4; i++) {
    var cx = VW * (0.15 + 0.23 * i), rx = VW * (0.22 + (i % 2) * 0.08);
    s += "<ellipse cx='" + cx + "' cy='" + yBase + "' rx='" + rx + "' ry='" + VH * 0.16 + "' fill='" + colors[i % colors.length] + "' opacity='0.5'>" +
      "<animate attributeName='cx' values='" + cx + ";" + (cx + VW * 0.05) + ";" + cx + "' keyTimes='0;0.5;1' dur='" + (9 + i * 2 + seed) + "s' repeatCount='indefinite'/>" +
      "<animate attributeName='opacity' values='0.35;0.6;0.35' keyTimes='0;0.5;1' dur='" + (7 + i * 2) + "s' repeatCount='indefinite'/></ellipse>";
  }
  return s;
}

/* rising particles */
function sparks(VW, VH, n, colors, fromY) {
  var s = "";
  for (var i = 0; i < n; i++) {
    var x = (i * 97 + 13) % VW, r = 2 + (i * 7) % 6, d = 5 + (i * 11) % 6, b = (i * 0.7) % 4;
    s += "<circle cx='" + x + "' cy='" + fromY + "' r='" + r + "' fill='" + colors[i % colors.length] + "'>" +
      "<animate attributeName='cy' from='" + fromY + "' to='-30' dur='" + d + "s' begin='" + b + "s' repeatCount='indefinite'/>" +
      "<animate attributeName='opacity' values='0;0.9;0' keyTimes='0;0.25;1' dur='" + d + "s' begin='" + b + "s' repeatCount='indefinite'/>" +
      "<animate attributeName='cx' values='" + x + ";" + (x + 30) + ";" + x + "' keyTimes='0;0.5;1' dur='" + d + "s' begin='" + b + "s' repeatCount='indefinite'/></circle>";
  }
  return s;
}

function defs(p) {
  return "<defs>" +
    "<linearGradient id='" + uid() + "g1' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='" + p.c1 + "'/><stop offset='1' stop-color='" + p.c2 + "'/></linearGradient>" +
    "</defs>";
}
/* gradient text needs its own defs id; simpler: per-template inline gradients */
function gradDef(id, c1, c2, x2, y2) {
  return "<linearGradient id='" + id + "' x1='0' y1='0' x2='" + (x2 || 1) + "' y2='" + (y2 || 0) + "'><stop offset='0' stop-color='" + c1 + "'/><stop offset='1' stop-color='" + c2 + "'/></linearGradient>";
}

function logoImg(p, x, y, size) {
  if (!p.logo) return "";
  return "<image href='" + p.logo + "' x='" + x + "' y='" + y + "' width='" + size + "' height='" + size + "' opacity='0'>" +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='0.5s' fill='freeze'/></image>";
}

function brandLine(p, x, y, size, color, anchor) {
  return rise("<text " + FONT + " x='" + x + "' y='" + y + "' font-size='" + size + "' font-weight='800' letter-spacing='5' fill='" + color +
    "' text-anchor='" + (anchor || "start") + "'>" + esc(clip(p.brand, 22).toUpperCase()) + "</text>", 20, 0.6, 0.2);
}

/* scene crossfade wrapper: two scenes, switch at frac */
function scenes(a, b, dur, frac) {
  var t = dur * frac;
  return "<g>" + a + "<animate attributeName='opacity' values='1;1;0' keyTimes='0;" + frac + ";1' dur='" + dur + "s' fill='freeze'/></g>" +
    "<g opacity='0'>" + b + "<animate attributeName='opacity' values='0;0;1' keyTimes='0;" + frac + ";1' dur='" + dur + "s' fill='freeze'/></g>";
}

/* ================= EMBER ================= */
function tEmber(p, VW, VH, D) {
  var gid = uid();
  var s1 = "<rect width='" + VW + "' height='" + VH + "' fill='#0a0705'/>";
  s1 += "<defs>" + gradDef(gid + "e", "#ffb347", "#ff5e3a") + "</defs>";
  s1 += clouds(VW, VH, VH * 0.94, ["#ff5e3a", "#b23c17", "#ff9a3c"], 0);
  s1 += sparks(VW, VH, 34, ["#ffb347", "#ff5e3a", "#ffd27a"], VH + 20);
  var st = wordStack(p.headline, VW / 2, VH * 0.34, VH * 0.155, "url(#" + gid + "e)", 0.7, 3);
  s1 += st.svg;
  s1 += rise("<text " + FONT + " x='" + VW / 2 + "' y='" + (st.bottom + VH * 0.10) + "' text-anchor='middle' font-size='" + VH * 0.048 +
    "' fill='#e8d9c8'>" + esc(clip(p.sub, 58)) + "</text>", 24, 0.7, 1.5);

  var s2 = "<rect width='" + VW + "' height='" + VH + "' fill='#0a0705'/>";
  s2 += clouds(VW, VH, VH * 0.94, ["#ff5e3a", "#ff9a3c"], 3);
  s2 += sparks(VW, VH, 20, ["#ffb347", "#ff5e3a"], VH + 20);
  s2 += brandLine(p, VW / 2, VH * 0.40, VH * 0.05, "#ffb347", "middle");
  s2 += rise("<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.58 + "' text-anchor='middle' font-size='" + VH * 0.075 +
    "' font-weight='800' fill='#fff'>" + esc(clip(p.cta, 26).toUpperCase()) + "</text>", 30, 0.7, D * 0.55 + 0.4);
  s2 += logoImg(p, VW / 2 - VH * 0.06, VH * 0.68, VH * 0.12);
  return "<rect width='" + VW + "' height='" + VH + "' fill='#0a0705'/>" + scenes(s1, s2, D, 0.52);
}

/* ================= MONEY ================= */
function tMoney(p, VW, VH, D) {
  var lime = "#b8e62e", deep = "#0d2812", mint = "#d7f5d0";
  var s1 = "<rect width='" + VW + "' height='" + VH + "' fill='" + deep + "'/>";
  // zigzag band
  var zz = "";
  for (var i = 0; i < 24; i++) zz += "M" + i * 80 + " 0 l40 34 l40 -34 ";
  s1 += "<path d='" + zz + "' stroke='" + lime + "' stroke-width='10' fill='none' opacity='0.9'>" +
    "<animateTransform attributeName='transform' type='translate' from='" + VW + " 0' to='0 0' dur='0.9s' begin='0.2s' " + EASE + " fill='freeze'/></path>";
  // shape field
  var shapes = [
    ["c", 0.12, 0.30, 0.075, lime], ["c", 0.85, 0.72, 0.10, "#fff"], ["c", 0.78, 0.25, 0.06, mint],
    ["p", 0.30, 0.75, 0.16, "#fff"], ["p", 0.62, 0.30, 0.12, lime],
    ["s", 0.45, 0.20, 0.05, mint], ["s", 0.20, 0.62, 0.045, lime], ["d", 0.90, 0.45, 0.05, "#fff"]
  ];
  var g = "";
  for (var k = 0; k < shapes.length; k++) {
    var sh = shapes[k], cx = VW * sh[1], cy = VH * sh[2], sz = VH * sh[3], f = sh[4], b = 0.4 + k * 0.12;
    if (sh[0] === "c") g += "<circle cx='" + cx + "' cy='" + cy + "' r='" + sz + "' fill='" + f + "'/>";
    else if (sh[0] === "p") g += "<rect x='" + (cx - sz * 1.8) + "' y='" + (cy - sz / 2) + "' width='" + sz * 3.6 + "' height='" + sz + "' rx='" + sz / 2 + "' fill='" + f + "'/>";
    else if (sh[0] === "s") { // star
      var pts = ""; for (var q = 0; q < 10; q++) { var a = -Math.PI / 2 + q * Math.PI / 5, rr = q % 2 ? sz * 0.45 : sz; pts += (cx + rr * Math.cos(a)).toFixed(0) + "," + (cy + rr * Math.sin(a)).toFixed(0) + " "; }
      g += "<polygon points='" + pts + "' fill='" + f + "'/>";
    } else g += "<rect x='" + (cx - sz / 2) + "' y='" + (cy - sz / 2) + "' width='" + sz + "' height='" + sz + "' fill='" + f + "' transform='rotate(45 " + cx + " " + cy + ")'/>";
    g = g.replace(/\/>$/, " opacity='0'><animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.4s' begin='" + b + "s' fill='freeze'/></" + (sh[0] === "s" ? "polygon" : sh[0] === "d" ? "rect" : sh[0] === "c" ? "circle" : "rect") + ">");
  }
  s1 += g;
  s1 += sticker(VW / 2, VH * 0.52, p.headline, "#fff", deep, -3, 1.1, VH * 0.055);
  s1 += rise("<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.68 + "' text-anchor='middle' font-size='" + VH * 0.05 +
    "' font-weight='700' fill='" + mint + "'>" + esc(clip(p.sub, 56)) + "</text>", 24, 0.7, 1.6);

  var s2 = "<rect width='" + VW + "' height='" + VH + "' fill='" + deep + "'/>";
  var syms = ["$", "€", "₹", "¥"];
  for (var j = 0; j < 4; j++) {
    var px = VW * (0.18 + j * 0.215), pr = VH * 0.13;
    s2 += "<g opacity='0'><circle cx='" + px + "' cy='" + VH * 0.42 + "' r='" + pr + "' fill='" + (j % 2 ? lime : mint) + "'/>" +
      "<text " + FONT + " x='" + px + "' y='" + VH * 0.475 + "' text-anchor='middle' font-size='" + pr + "' font-weight='900' fill='" + deep + "'>" + syms[j] + "</text>" +
      "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.5s' begin='" + (D * 0.55 + j * 0.15) + "s' fill='freeze'/>" +
      "<animateTransform attributeName='transform' type='translate' values='0 " + VH * 0.2 + ";0 0' keyTimes='0;1' " + EASE + " dur='0.6s' begin='" + (D * 0.55 + j * 0.15) + "s' fill='freeze'/></g>";
  }
  s2 += rise("<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.78 + "' text-anchor='middle' font-size='" + VH * 0.06 +
    "' font-weight='900' fill='#fff'>" + esc(clip(p.cta, 24).toUpperCase()) + "</text>", 26, 0.7, D * 0.55 + 0.8);
  s2 += brandLine(p, VW / 2, VH * 0.14, VH * 0.042, lime, "middle");
  return scenes(s1, s2, D, 0.52);
}

/* ================= HORIZON ================= */
function tHorizon(p, VW, VH, D) {
  var gid = uid();
  var s1 = "<defs>" + gradDef(gid + "sky", "#1b2a6b", "#ff7a3c", 0.3, 1) + gradDef(gid + "sun", "#fff3c4", "#ff9a3c") + "</defs>";
  s1 += "<rect width='" + VW + "' height='" + VH + "' fill='url(#" + gid + "sky)'/>";
  s1 += "<circle cx='" + VW * 0.5 + "' cy='" + VH * 1.0 + "' r='" + VH * 0.22 + "' fill='url(#" + gid + "sun)" + "'>" +
    "<animate attributeName='cy' from='" + VH * 1.0 + "' to='" + VH * 0.46 + "' dur='2.6s' begin='0.2s' " + EASE + " fill='freeze'/></circle>";
  // mountain layers
  var m1 = "M0 " + VH * 0.78 + " L" + VW * 0.2 + " " + VH * 0.55 + " L" + VW * 0.38 + " " + VH * 0.72 + " L" + VW * 0.6 + " " + VH * 0.5 + " L" + VW * 0.82 + " " + VH * 0.74 + " L" + VW + " " + VH * 0.6 + " L" + VW + " " + VH + " L0 " + VH + " Z";
  var m2 = "M0 " + VH * 0.9 + " L" + VW * 0.25 + " " + VH * 0.72 + " L" + VW * 0.5 + " " + VH * 0.88 + " L" + VW * 0.75 + " " + VH * 0.7 + " L" + VW + " " + VH * 0.86 + " L" + VW + " " + VH + " L0 " + VH + " Z";
  s1 += "<path d='" + m1 + "' fill='#141c3f' opacity='0.85'/><path d='" + m2 + "' fill='#0b0f24'/>";
  var st = wordStack(p.headline, VW / 2, VH * 0.30, VH * 0.13, "#fff", 1.0, 3);
  s1 += st.svg;

  var s2 = "<rect width='" + VW + "' height='" + VH + "' fill='#0b0f24'/>";
  s2 += "<circle cx='" + VW / 2 + "' cy='" + VH * 0.40 + "' r='" + VH * 0.30 + "' fill='url(#" + gid + "sun)' opacity='0.25'/>";
  s2 += brandLine(p, VW / 2, VH * 0.30, VH * 0.05, "#ff9a3c", "middle");
  s2 += rise("<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.58 + "' text-anchor='middle' font-size='" + VH * 0.062 +
    "' fill='#dfe4f5'>" + esc(clip(p.sub, 60)) + "</text>", 26, 0.7, D * 0.55 + 0.4);
  s2 += sticker(VW / 2, VH * 0.74, p.cta, "#fff", "#0b0f24", 0, D * 0.55 + 0.9, VH * 0.045);
  s2 += logoImg(p, VW / 2 - VH * 0.055, VH * 0.83, VH * 0.11);
  return scenes(s1, s2, D, 0.55);
}

/* ================= CAPSULE (9:16) ================= */
function tCapsule(p, VW, VH, D) {
  var s = "<rect width='" + VW + "' height='" + VH + "' fill='#1f3bff'/>";
  s += "<circle cx='" + VW * 0.85 + "' cy='" + VH * 0.08 + "' r='" + VW * 0.3 + "' fill='#6f86ff' opacity='0.5'/>";
  var st = wordStack(p.headline, VW / 2, VH * 0.22, VW * 0.21, "#fff", 0.5, 3);
  s += st.svg;
  var pills = [p.brand, "WE DO", p.cta];
  var cols = [["#fff", "#1f3bff"], ["#0d0d12", "#fff"], ["#7dffb0", "#0d0d12"]];
  for (var i = 0; i < 3; i++) {
    s += sticker(VW * (0.5 + (i % 2 ? 0.08 : -0.08)), st.bottom + VH * 0.07 + i * VH * 0.075,
      pills[i] || ("ITEM " + (i + 1)), cols[i][0], cols[i][1], (i % 2 ? 4 : -4), 1.4 + i * 0.28, VH * 0.038);
  }
  s += rise("<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.92 + "' text-anchor='middle' font-size='" + VH * 0.032 +
    "' fill='#cfd6ff'>" + esc(clip(p.sub, 52)) + "</text>", 20, 0.7, 2.4);
  s += logoImg(p, VW / 2 - VH * 0.04, VH * 0.03, VH * 0.08);
  return s;
}

/* ================= MARQUEE (9:16) ================= */
function tMarquee(p, VW, VH, D) {
  var gid = uid();
  var s = "<defs>" + gradDef(gid + "cr", "#f5efe0", "#d8cdb4") + "</defs><rect width='" + VW + "' height='" + VH + "' fill='#0c0c0c'/>";
  var big = esc(clip(p.headline, 22).toUpperCase());
  function band(y, size, fill, dur, from, op) {
    return "<g opacity='" + (op || 1) + "'><text " + FONT + " x='0' y='" + y + "' font-size='" + size + "' font-weight='900' letter-spacing='-2' fill='" + fill + "'>" +
      big + " · " + big + " · " + big + " · " + big + "</text>" +
      "<animateTransform attributeName='transform' type='translate' from='" + from + " 0' to='" + (from - VW * 1.2) + " 0' dur='" + dur + "s' repeatCount='indefinite'/></g>";
  }
  s += band(VH * 0.30, VH * 0.13, "url(#" + gid + "cr)", 7, 0);
  s += band(VH * 0.44, VH * 0.13, "none", 9, -VW * 0.6, 1).replace("fill='none'", "fill='none' stroke='#f5efe0' stroke-width='2'");
  s += band(VH * 0.58, VH * 0.13, "url(#" + gid + "cr)", 7, -VW * 0.3);
  s += "<rect y='" + VH * 0.66 + "' width='" + VW + "' height='" + VH * 0.34 + "' fill='#f5efe0'/>";
  s += rise("<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.78 + "' text-anchor='middle' font-size='" + VH * 0.045 +
    "' font-weight='700' fill='#0c0c0c'>" + esc(clip(p.sub, 54)) + "</text>", 22, 0.7, 0.9);
  s += sticker(VW / 2, VH * 0.88, p.cta, "#0c0c0c", "#f5efe0", 0, 1.4, VH * 0.034);
  s += brandLine(p, VW / 2, VH * 0.72, VH * 0.03, "#0c0c0c", "middle");
  return s;
}

/* ================= NOVA ================= */
function tNova(p, VW, VH, D) {
  var gid = uid();
  var s = "<defs>" + gradDef(gid + "n", p.c1, p.c2) + "</defs><rect width='" + VW + "' height='" + VH + "' fill='#f2ede2'/>";
  // rotating rays
  var rays = "";
  for (var i = 0; i < 16; i++) rays += "<rect x='" + (VW / 2 - 3) + "' y='" + VH * 0.10 + "' width='6' height='" + VH * 0.24 + "' fill='" + p.c2 + "' opacity='0.55' transform='rotate(" + i * 22.5 + " " + VW / 2 + " " + VH * 0.36 + ")'/>";
  s += "<g>" + rays + "<animateTransform attributeName='transform' type='rotate' from='0 " + VW / 2 + " " + VH * 0.36 + "' to='360 " + VW / 2 + " " + VH * 0.36 + "' dur='30s' repeatCount='indefinite'/></g>";
  // glitch brand sting
  var by = VH * 0.36, bs = VH * 0.10;
  function glitch(dx, fill, b, op) {
    return "<text " + FONT + " x='" + (VW / 2 + dx) + "' y='" + by + "' text-anchor='middle' font-size='" + bs + "' font-weight='900' letter-spacing='4' fill='" + fill + "' opacity='" + op + "'>" +
      esc(clip(p.brand, 18).toUpperCase()) +
      "<animate attributeName='x' values='" + (VW / 2 + dx) + ";" + (VW / 2 + dx + 14) + ";" + (VW / 2 + dx - 10) + ";" + (VW / 2 + dx) + "' keyTimes='0;0.3;0.6;1' dur='0.5s' begin='" + b + "s' fill='freeze'/></text>";
  }
  s += glitch(-8, "#00c2ff", 0.4, 0.7) + glitch(8, "#ff2e63", 0.45, 0.7);
  s += rise("<text " + FONT + " x='" + VW / 2 + "' y='" + by + "' text-anchor='middle' font-size='" + bs + "' font-weight='900' letter-spacing='4' fill='#141414'>" +
    esc(clip(p.brand, 18).toUpperCase()) + "</text>", 0, 0.4, 0.9);
  var st = wordStack(p.headline, VW / 2, VH * 0.58, VH * 0.105, "#141414", 1.2, 3);
  s += st.svg;
  s += rise("<text " + FONT + " x='" + VW / 2 + "' y='" + (st.bottom + VH * 0.07) + "' text-anchor='middle' font-size='" + VH * 0.042 +
    "' fill='#5a5648'>" + esc(clip(p.sub, 56)) + "</text>", 22, 0.7, 2.0);
  s += logoImg(p, VW - VH * 0.13, VH * 0.05, VH * 0.08);
  return s;
}

/* ================= SPARK (product-UI mock) ================= */
function tSpark(p, VW, VH, D) {
  var s = "<rect width='" + VW + "' height='" + VH + "' fill='#101014'/>";
  s += "<circle cx='" + VW * 0.8 + "' cy='" + VH * 0.2 + "' r='" + VH * 0.35 + "' fill='" + p.c1 + "' opacity='0.18'/>";
  s += "<circle cx='" + VW * 0.15 + "' cy='" + VH * 0.85 + "' r='" + VH * 0.3 + "' fill='" + p.c2 + "' opacity='0.14'/>";
  // search bar
  var bw = VW * 0.62, bx = VW * 0.19, by = VH * 0.30, bh = VH * 0.11;
  s += rise("<g><rect x='" + bx + "' y='" + by + "' width='" + bw + "' height='" + bh + "' rx='" + bh / 2 + "' fill='#1c1c22' stroke='#3a3a46' stroke-width='2'/>" +
    "<circle cx='" + (bx + bh * 0.55) + "' cy='" + (by + bh / 2) + "' r='" + bh * 0.2 + "' fill='none' stroke='#8a8a99' stroke-width='3'/></g>", 30, 0.6, 0.4);
  var q = esc(clip(p.brief || p.headline, 42));
  var qid = uid();
  s += "<clipPath id='" + qid + "'><rect x='" + (bx + bh) + "' y='" + by + "' width='0' height='" + bh + "'>" +
    "<animate attributeName='width' from='0' to='" + bw * 0.8 + "' dur='1.6s' begin='1.1s' fill='freeze'/></rect></clipPath>" +
    "<text " + FONT + " x='" + (bx + bh * 1.1) + "' y='" + (by + bh * 0.64) + "' font-size='" + bh * 0.38 + "' fill='#e8e8f0' clip-path='url(#" + qid + ")'>" + q + "</text>";
  s += "<rect x='" + (bx + bh * 1.1 + q.length * bh * 0.21) + "' y='" + (by + bh * 0.22) + "' width='3' height='" + bh * 0.56 + "' fill='#fff'>" +
    "<animate attributeName='opacity' values='1;0;1' keyTimes='0;0.5;1' dur='0.9s' begin='1.1s' repeatCount='indefinite'/></rect>";
  // result cards pop in
  var cards = [p.headline, p.sub, p.cta];
  for (var i = 0; i < 3; i++) {
    var cy = by + bh * 1.7 + i * VH * 0.13;
    s += "<g opacity='0'><rect x='" + bx + "' y='" + cy + "' width='" + bw + "' height='" + VH * 0.105 + "' rx='14' fill='" + (i === 0 ? p.c1 : "#1c1c22") + "'/>" +
      "<text " + FONT + " x='" + (bx + 28) + "' y='" + (cy + VH * 0.066) + "' font-size='" + VH * 0.042 + "' font-weight='" + (i === 0 ? "800" : "500") +
      "' fill='" + (i === 0 ? "#0c0c10" : "#d5d5e0") + "'>" + esc(clip(cards[i] || "", i === 0 ? 34 : 46)) + "</text>" +
      "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.45s' begin='" + (2.6 + i * 0.35) + "s' fill='freeze'/>" +
      "<animateTransform attributeName='transform' type='translate' values='0 26;0 0' keyTimes='0;1' " + EASE + " dur='0.5s' begin='" + (2.6 + i * 0.35) + "s' fill='freeze'/></g>";
  }
  s += brandLine(p, bx, VH * 0.16, VH * 0.042, p.c2, "start");
  return s;
}

/* ================= PIXEL ================= */
function tPixel(p, VW, VH, D) {
  var s = "<rect width='" + VW + "' height='" + VH + "' fill='#0b0b10'/>";
  var cols = 18, rows = 10, cell = Math.min(VW / cols, VH / rows);
  var ox = (VW - cols * cell) / 2, oy = (VH - rows * cell) / 2, g = "";
  for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
    var on = ((r * 7 + c * 13) % 4 === 0);
    g += "<rect x='" + (ox + c * cell + 2).toFixed(0) + "' y='" + (oy + r * cell + 2).toFixed(0) + "' width='" + (cell - 4).toFixed(0) +
      "' height='" + (cell - 4).toFixed(0) + "' rx='4' fill='" + (on ? p.c2 : "#191922") + "'" +
      (on ? "><animate attributeName='opacity' values='0.2;1;0.2' keyTimes='0;0.5;1' dur='" + (1.4 + ((r + c) % 5) * 0.35) + "s' repeatCount='indefinite'/></rect>"
          : " opacity='0'><animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='" + (0.2 + (r + c) * 0.02) + "s' fill='freeze'/></rect>");
  }
  s += g;
  // scanline
  s += "<rect width='" + VW + "' height='6' fill='#fff' opacity='0.10'><animate attributeName='y' from='-10' to='" + VH + "' dur='4s' repeatCount='indefinite'/></rect>";
  s += "<rect x='" + VW * 0.10 + "' y='" + VH * 0.28 + "' width='" + VW * 0.80 + "' height='" + VH * 0.44 + "' rx='18' fill='#0b0b10' opacity='0.92'/>";
  var st = wordStack(p.headline, VW / 2, VH * 0.40, VH * 0.115, "#fff", 0.8, 3);
  s += st.svg;
  s += rise("<text " + FONT + " x='" + VW / 2 + "' y='" + (st.bottom + VH * 0.05) + "' text-anchor='middle' font-size='" + VH * 0.042 +
    "' fill='" + p.c2 + "'>" + esc(clip(p.sub, 54)) + "</text>", 20, 0.6, 1.7);
  s += brandLine(p, VW / 2, VH * 0.20, VH * 0.04, p.c2, "middle");
  s += logoImg(p, VW - VH * 0.13, VH * 0.05, VH * 0.08);
  return s;
}

/* ================= WAVE ================= */
function tWave(p, VW, VH, D) {
  var gid = uid();
  var s = "<defs>" + gradDef(gid + "w", "#0c1a2e", p.c1, 0, 1) + "</defs><rect width='" + VW + "' height='" + VH + "' fill='url(#" + gid + "w)'/>";
  for (var i = 0; i < 4; i++) {
    var yb = VH * (0.52 + i * 0.11), amp = VH * 0.045;
    var d = "M" + (-VW * 0.25) + " " + yb + " Q " + (-VW * 0.125) + " " + (yb - amp * 2) + " 0 " + yb + " T " + VW * 0.25 + " " + yb + " T " + VW * 0.5 + " " + yb + " T " + VW * 0.75 + " " + yb + " T " + VW + " " + yb + " T " + VW * 1.25 + " " + yb;
    s += "<g><path d='" + d + "' fill='none' stroke='" + (i % 2 ? p.c2 : "#ffffff") + "' stroke-width='" + (VH * 0.016) + "' opacity='" + (0.85 - i * 0.18) + "'/>" +
      "<animateTransform attributeName='transform' type='translate' from='0 0' to='" + (-VW * 0.25) + " 0' dur='" + (6 - i * 0.8) + "s' repeatCount='indefinite'/></g>";
  }
  s += brandLine(p, VW * 0.07, VH * 0.16, VH * 0.042, p.c2, "start");
  s += wipeLine(p.headline, VW * 0.07, VH * 0.42, VH * 0.13, "#fff", 0.7, VW, "start");
  s += rise("<text " + FONT + " x='" + VW * 0.07 + "' y='" + VH * 0.54 + "' font-size='" + VH * 0.05 + "' fill='#d7e3f2'>" +
    esc(clip(p.sub, 58)) + "</text>", 24, 0.7, 1.4);
  s += sticker(VW * 0.19, VH * 0.70, p.cta, "#fff", "#0c1a2e", -2, 2.0, VH * 0.04);
  s += logoImg(p, VW - VH * 0.14, VH * 0.06, VH * 0.08);
  return s;
}

/* ================= ORBIT ================= */
function tOrbit(p, VW, VH, D) {
  var gid = uid(), s = "<defs>" + gradDef(gid + "o", p.c1, p.c2) + "</defs><rect width='" + VW + "' height='" + VH + "' fill='#07070d'/>";
  var stars = "";
  for (var i = 0; i < 46; i++) stars += "<circle cx='" + (i * 97) % VW + "' cy='" + (i * 61) % VH + "' r='" + (1 + i % 2) + "' fill='#fff' opacity='0.5'><animate attributeName='opacity' values='0.2;0.85;0.2' keyTimes='0;0.5;1' dur='" + (2 + i % 3) + "s' repeatCount='indefinite'/></circle>";
  s += stars;
  var cx = VW * 0.5, cy = VH * 0.40, R = Math.min(VW, VH) * 0.30;
  s += "<ellipse cx='" + cx + "' cy='" + cy + "' rx='" + R + "' ry='" + R * 0.42 + "' fill='none' stroke='" + p.c2 + "' stroke-width='3' opacity='0.55' transform='rotate(-12 " + cx + " " + cy + ")'/>";
  s += "<ellipse cx='" + cx + "' cy='" + cy + "' rx='" + R * 1.25 + "' ry='" + R * 0.55 + "' fill='none' stroke='" + p.c1 + "' stroke-width='2' opacity='0.3' transform='rotate(-12 " + cx + " " + cy + ")'/>";
  s += "<circle cx='" + cx + "' cy='" + cy + "' r='" + R * 0.42 + "' fill='url(#" + gid + "o)'/>";
  s += "<g><circle cx='" + (cx + R) + "' cy='" + cy + "' r='" + R * 0.13 + "' fill='#fff'/>" +
    "<animateTransform attributeName='transform' type='rotate' from='-12 " + cx + " " + cy + "' to='348 " + cx + " " + cy + "' dur='7s' repeatCount='indefinite'/></g>";
  s += "<g><circle cx='" + (cx - R * 1.25) + "' cy='" + cy + "' r='" + R * 0.08 + "' fill='" + p.c2 + "'/>" +
    "<animateTransform attributeName='transform' type='rotate' from='-12 " + cx + " " + cy + "' to='348 " + cx + " " + cy + "' dur='11s' repeatCount='indefinite'/></g>";
  s += brandLine(p, cx, VH * 0.10, VH * 0.04, p.c2, "middle");
  var st = wordStack(p.headline, cx, VH * 0.68, VH * 0.10, "#fff", 0.9, 3);
  s += st.svg;
  s += rise("<text " + FONT + " x='" + cx + "' y='" + (st.bottom + VH * 0.05) + "' text-anchor='middle' font-size='" + VH * 0.04 +
    "' fill='#b9b9d0'>" + esc(clip(p.sub, 54)) + "</text>", 20, 0.6, 1.8);
  return s;
}

/* ================= BLOOM ================= */
function tBloom(p, VW, VH, D) {
  var s = "<rect width='" + VW + "' height='" + VH + "' fill='#f6f1e8'/>";
  var petals = "";
  for (var i = 0; i < 10; i++) {
    petals += "<g transform='rotate(" + i * 36 + " " + VW / 2 + " " + VH * 0.32 + ")'><ellipse cx='" + VW / 2 + "' cy='" + VH * 0.32 + "' rx='" + VH * 0.045 + "' ry='" + VH * 0.125 + "' fill='" + (i % 2 ? p.c2 : p.c1) + "' opacity='0.9'>" +
      "<animateTransform attributeName='transform' type='scale' values='0.2;1.1;1' keyTimes='0;0.7;1' " + EASE + " dur='0.9s' begin='" + (0.3 + i * 0.1) + "s' fill='freeze'/></ellipse></g>";
  }
  s += petals;
  s += "<circle cx='" + VW / 2 + "' cy='" + VH * 0.32 + "' r='0' fill='#16161c'><animate attributeName='r' from='0' to='" + VH * 0.05 + "' dur='0.5s' begin='1.3s' fill='freeze'/></circle>";
  var st = wordStack(p.headline, VW / 2, VH * 0.58, VH * 0.10, "#16161c", 1.1, 3);
  s += st.svg;
  s += rise("<text " + FONT + " x='" + VW / 2 + "' y='" + (st.bottom + VH * 0.06) + "' text-anchor='middle' font-size='" + VH * 0.044 +
    "' fill='#6a6558'>" + esc(clip(p.sub, 56)) + "</text>", 22, 0.7, 1.9);
  s += sticker(VW / 2, VH * 0.90, p.cta, "#16161c", "#f6f1e8", 0, 2.4, VH * 0.036);
  s += logoImg(p, VW - VH * 0.13, VH * 0.05, VH * 0.08);
  return s;
}

/* ================= PULSE ================= */
function tPulse(p, VW, VH, D) {
  var gid = uid(), s = "<defs>" + gradDef(gid + "p", p.c1, p.c2) + "</defs><rect width='" + VW + "' height='" + VH + "' fill='#0a0a0f'/>";
  var rings = "";
  for (var i = 0; i < 5; i++) {
    rings += "<circle cx='" + VW / 2 + "' cy='" + VH * 0.40 + "' r='" + VH * 0.07 + "' fill='none' stroke='" + p.c2 + "' stroke-width='4'>" +
      "<animate attributeName='r' from='" + VH * 0.07 + "' to='" + VH * 0.44 + "' dur='2.8s' begin='" + i * 0.56 + "s' repeatCount='indefinite'/>" +
      "<animate attributeName='opacity' values='0.85;0' keyTimes='0;1' dur='2.8s' begin='" + i * 0.56 + "s' repeatCount='indefinite'/></circle>";
  }
  s += rings;
  s += "<circle cx='" + VW / 2 + "' cy='" + VH * 0.40 + "' r='" + VH * 0.065 + "' fill='url(#" + gid + "p)'>" +
    "<animate attributeName='r' values='" + VH * 0.065 + ";" + VH * 0.075 + ";" + VH * 0.065 + "' keyTimes='0;0.5;1' dur='2.8s' repeatCount='indefinite'/></circle>";
  s += brandLine(p, VW / 2, VH * 0.12, VH * 0.042, "#fff", "middle");
  var st = wordStack(p.headline, VW / 2, VH * 0.62, VH * 0.105, "#fff", 0.8, 3);
  s += st.svg;
  s += rise("<text " + FONT + " x='" + VW / 2 + "' y='" + (st.bottom + VH * 0.055) + "' text-anchor='middle' font-size='" + VH * 0.042 +
    "' fill='#c6c6da'>" + esc(clip(p.sub, 56)) + "</text>", 22, 0.7, 1.7);
  s += sticker(VW / 2, VH * 0.90, p.cta, "#fff", "#0a0a0f", 0, 2.3, VH * 0.038);
  return s;
}

var TEMPLATES = [
  { id: "ember",   name: "Ember",   aspects: ["16:9"],         duration: 14, cat: "launches", desc: "Ember glow and giant gradient type. Product launches and bold announcements.", fn: tEmber },
  { id: "money",   name: "Money",   aspects: ["16:9"],         duration: 13, cat: "services", desc: "Popping shapes and currency marks on deep green. Payments and money products.", fn: tMoney },
  { id: "horizon", name: "Horizon", aspects: ["16:9"],         duration: 14, cat: "brand",    desc: "A cinematic sunrise over mountain silhouettes. Brand intros and kickoffs.", fn: tHorizon },
  { id: "capsule", name: "Capsule", aspects: ["9:16"],         duration: 12, cat: "social",   desc: "Giant stacked type with sticker pills. Vertical stories, reels and shorts.", fn: tCapsule },
  { id: "marquee", name: "Marquee", aspects: ["9:16"],         duration: 11, cat: "events",   desc: "Towering scrolling type bands. Event announcements and countdown teasers.", fn: tMarquee },
  { id: "nova",    name: "Nova",    aspects: ["16:9", "9:16"], duration: 12, cat: "launches", desc: "A glitch brand sting with rotating rays. Launches that need drama.", fn: tNova },
  { id: "spark",   name: "Spark",   aspects: ["16:9"],         duration: 12, cat: "services", desc: "A search box that types your brief and answers it. AI tools and apps.", fn: tSpark },
  { id: "pixel",   name: "Pixel",   aspects: ["16:9"],         duration: 11, cat: "services", desc: "A living light-grid with a scanline sweep. Tech and dev-tool brands.", fn: tPixel },
  { id: "wave",    name: "Wave",    aspects: ["16:9"],         duration: 12, cat: "brand",    desc: "Drifting waves and a type wipe reveal. Calm, confident brand stories.", fn: tWave },
  { id: "orbit",   name: "Orbit",   aspects: ["16:9", "9:16"], duration: 13, cat: "brand",    desc: "Your brand at the centre of its own solar system. Logo moments.", fn: tOrbit },
  { id: "bloom",   name: "Bloom",   aspects: ["16:9", "9:16"], duration: 11, cat: "shops",    desc: "Petals bursting open in brand colour. Shops, makers, gentle stories.", fn: tBloom },
  { id: "pulse",   name: "Pulse",   aspects: ["16:9", "9:16"], duration: 11, cat: "events",   desc: "Sonar rings with a popping call to action. Announcements that convert.", fn: tPulse }
];

var ASPECTS = { "16:9": [1600, 900], "9:16": [900, 1600] };

function defaultParams() {
  return { brand: "Your Brand", headline: "Your headline here", sub: "One clear sentence about what you do.",
    cta: "Learn more", c1: "#7c5cff", c2: "#ff7ad9", logo: "", brief: "" };
}

function renderTemplate(id, p, aspect) {
  var t = null;
  for (var i = 0; i < TEMPLATES.length; i++) if (TEMPLATES[i].id === id) t = TEMPLATES[i];
  if (!t) t = TEMPLATES[0];
  p = Object.assign(defaultParams(), p || {});
  var dim = ASPECTS[aspect] || ASPECTS["16:9"];
  var VW = dim[0], VH = dim[1];
  var inner = t.fn(p, VW, VH, t.duration);
  var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 " + VW + " " + VH + "' width='" + VW + "' height='" + VH + "'>" + inner + "</svg>";
  return { svg: svg, duration: t.duration, width: VW, height: VH, template: t };
}

if (typeof module !== "undefined") module.exports = { TEMPLATES: TEMPLATES, renderTemplate: renderTemplate, defaultParams: defaultParams };
