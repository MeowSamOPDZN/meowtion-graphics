/* Meowtion Graphics — original animated SVG templates.
   Each template renders a self-contained SVG string (SMIL-animated, no external
   assets) so it plays both inline in the page and inside an <img> for video export.
   render(id, params, aspect) -> { svg, duration } */

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function clip(s, n) { s = String(s || ""); return s.length > n ? s.slice(0, n - 1) + "…" : s; }
const FONT = "font-family='-apple-system,BlinkMacSystemFont,Segoe UI,Inter,Helvetica,Arial,sans-serif'";

function logoImg(p, x, y, size, opacity) {
  if (!p.logo) return "";
  return "<image href='" + p.logo + "' x='" + x + "' y='" + y + "' width='" + size + "' height='" + size + "' opacity='" + (opacity || 1) + "'>" +
    "<animate attributeName='opacity' values='0;" + (opacity || 1) + "' keyTimes='0;1' dur='0.8s' begin='0.4s' fill='freeze'/></image>";
}

function brandMark(p, x, y, size, color, anchor) {
  anchor = anchor || "start";
  var t = "<text " + FONT + " x='" + x + "' y='" + y + "' font-size='" + size + "' font-weight='800' letter-spacing='3' fill='" + color + "' text-anchor='" + anchor + "'>" + esc(clip(p.brand, 24).toUpperCase()) + "</text>";
  return t;
}

function defs(p) {
  return "<defs>" +
    "<linearGradient id='g1' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='" + p.c1 + "'/><stop offset='1' stop-color='" + p.c2 + "'/></linearGradient>" +
    "<radialGradient id='glow' cx='0.5' cy='0.5' r='0.5'><stop offset='0' stop-color='" + p.c2 + "' stop-opacity='0.55'/><stop offset='1' stop-color='" + p.c2 + "' stop-opacity='0'/></radialGradient>" +
    "</defs>";
}

/* ---------------- EMBER ---------------- */
function tEmber(p, VW, VH) {
  var s = defs(p);
  var embers = "";
  for (var i = 0; i < 26; i++) {
    var x = (i * 61) % VW, r = 3 + (i * 7) % 8, d = 6 + (i * 13) % 7;
    embers += "<circle cx='" + x + "' cy='" + (VH + 20) + "' r='" + r + "' fill='" + (i % 3 ? p.c2 : p.c1) + "' opacity='0.8'>" +
      "<animate attributeName='cy' from='" + (VH + 20) + "' to='-40' dur='" + d + "s' begin='" + (i % 5) + "s' repeatCount='indefinite'/>" +
      "<animate attributeName='opacity' values='0;0.85;0' keyTimes='0;0.2;1' dur='" + d + "s' begin='" + (i % 5) + "s' repeatCount='indefinite'/></circle>";
  }
  s += "<rect width='" + VW + "' height='" + VH + "' fill='#0b0b10'/>" + embers;
  s += "<ellipse cx='" + VW / 2 + "' cy='" + VH * 0.62 + "' rx='" + VW * 0.45 + "' ry='" + VH * 0.3 + "' fill='url(#glow)'/>";
  s += brandMark(p, VW / 2, VH * 0.30, VH * 0.045, p.c2, "middle");
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.52 + "' text-anchor='middle' font-size='" + VH * 0.13 + "' font-weight='900' fill='#fff'>" +
    "<tspan>" + esc(clip(p.headline, 34)) + "</tspan>" +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.9s' begin='0.8s' fill='freeze'/></text>";
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.63 + "' text-anchor='middle' font-size='" + VH * 0.05 + "' fill='#cfcfe0'>" + esc(clip(p.sub, 60)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.9s' begin='1.6s' fill='freeze'/></text>";
  s += "<rect x='" + (VW / 2 - VW * 0.11) + "' y='" + VH * 0.70 + "' width='" + VW * 0.22 + "' height='" + VH * 0.085 + "' rx='" + VH * 0.045 + "' fill='url(#g1)'>" +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.7s' begin='2.4s' fill='freeze'/></rect>";
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.755 + "' text-anchor='middle' font-size='" + VH * 0.042 + "' font-weight='800' fill='#0b0b10'>" + esc(clip(p.cta, 22)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.7s' begin='2.4s' fill='freeze'/></text>";
  s += logoImg(p, VW - VH * 0.14, VH * 0.06, VH * 0.08);
  return s;
}

/* ---------------- MONEY ---------------- */
function tMoney(p, VW, VH) {
  var s = defs(p);
  s += "<rect width='" + VW + "' height='" + VH + "' fill='url(#g1)'/>";
  s += "<rect width='" + VW + "' height='" + VH + "' fill='#000' opacity='0.25'/>";
  var coins = "";
  for (var i = 0; i < 5; i++) {
    var cx = VW * (0.14 + i * 0.18), r = VH * (0.05 + (i % 3) * 0.02);
    coins += "<g opacity='0'><circle cx='" + cx + "' cy='" + VH * 0.82 + "' r='" + r + "' fill='none' stroke='#fff' stroke-width='" + VH * 0.012 + "'/>" +
      "<text " + FONT + " x='" + cx + "' y='" + VH * 0.845 + "' text-anchor='middle' font-size='" + r * 1.1 + "' font-weight='900' fill='#fff'>$</text>" +
      "<animate attributeName='opacity' values='0;0.9;0' keyTimes='0;0.5;1' dur='3s' begin='" + (i * 0.5) + "s' repeatCount='indefinite'/>" +
      "<animateTransform attributeName='transform' type='translate' from='0 0' to='0 " + (-VH * 0.5) + "' dur='3s' begin='" + (i * 0.5) + "s' repeatCount='indefinite'/></g>";
  }
  s += coins;
  s += brandMark(p, VW * 0.08, VH * 0.16, VH * 0.045, "#ffffff", "start");
  s += "<text " + FONT + " x='" + VW * 0.08 + "' y='" + VH * 0.44 + "' font-size='" + VH * 0.15 + "' font-weight='900' fill='#fff'>" + esc(clip(p.headline, 30)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='0.6s' fill='freeze'/></text>";
  s += "<text " + FONT + " x='" + VW * 0.08 + "' y='" + VH * 0.56 + "' font-size='" + VH * 0.055 + "' fill='#f2f2f2'>" + esc(clip(p.sub, 64)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='1.3s' fill='freeze'/></text>";
  s += "<rect x='" + VW * 0.08 + "' y='" + VH * 0.66 + "' width='" + VW * 0.20 + "' height='" + VH * 0.09 + "' rx='" + VH * 0.045 + "' fill='#fff'>" +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.7s' begin='2s' fill='freeze'/></rect>";
  s += "<text " + FONT + " x='" + (VW * 0.18) + "' y='" + VH * 0.722 + "' text-anchor='middle' font-size='" + VH * 0.042 + "' font-weight='800' fill='#111'>" + esc(clip(p.cta, 22)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.7s' begin='2s' fill='freeze'/></text>";
  s += logoImg(p, VW - VH * 0.14, VH * 0.06, VH * 0.08);
  return s;
}

/* ---------------- HORIZON ---------------- */
function tHorizon(p, VW, VH) {
  var s = defs(p);
  s += "<rect width='" + VW + "' height='" + VH + "' fill='#101018'/>";
  s += "<rect width='" + VW + "' height='" + VH * 0.62 + "' fill='url(#g1)' opacity='0.9'/>";
  s += "<circle cx='" + VW * 0.5 + "' cy='" + VH * 0.95 + "' r='" + VH * 0.20 + "' fill='#fff' opacity='0.95'>" +
    "<animate attributeName='cy' from='" + VH * 0.95 + "' to='" + VH * 0.42 + "' dur='2.5s' begin='0.3s' fill='freeze'/></circle>";
  s += "<ellipse cx='" + VW * 0.5 + "' cy='" + VH * 0.42 + "' rx='" + VH * 0.34 + "' ry='" + VH * 0.20 + "' fill='url(#glow)'/>";
  s += brandMark(p, VW / 2, VH * 0.14, VH * 0.042, "#ffffff", "middle");
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.78 + "' text-anchor='middle' font-size='" + VH * 0.12 + "' font-weight='900' fill='#fff'>" + esc(clip(p.headline, 34)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.9s' begin='1.2s' fill='freeze'/></text>";
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.88 + "' text-anchor='middle' font-size='" + VH * 0.048 + "' fill='#d8d8e4'>" + esc(clip(p.sub, 60)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.9s' begin='1.9s' fill='freeze'/></text>";
  s += logoImg(p, VW / 2 - VH * 0.05, VH * 0.90, VH * 0.10);
  return s;
}

/* ---------------- CAPSULE ---------------- */
function tCapsule(p, VW, VH) {
  var s = defs(p);
  s += "<rect width='" + VW + "' height='" + VH + "' fill='#0d0d12'/>";
  for (var i = 0; i < 3; i++) {
    var y = VH * (0.3 + i * 0.2);
    s += "<rect x='" + (-VW * 0.6) + "' y='" + (y - VH * 0.07) + "' width='" + VW * 0.9 + "' height='" + VH * 0.14 + "' rx='" + VH * 0.07 + "' fill='" + (i === 1 ? "url(#g1)" : "#1c1c26") + "' opacity='" + (i === 1 ? 1 : 0.7) + "'>" +
      "<animateTransform attributeName='transform' type='translate' from='0 0' to='" + VW * 0.55 + " 0' dur='1.2s' begin='" + (0.3 + i * 0.35) + "s' fill='freeze'/></rect>";
  }
  s += "<text " + FONT + " x='" + VW * 0.5 + "' y='" + VH * 0.18 + "' text-anchor='middle' font-size='" + VH * 0.05 + "' font-weight='800' letter-spacing='4' fill='" + p.c2 + "'>" + esc(clip(p.brand, 24).toUpperCase()) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='0.2s' fill='freeze'/></text>";
  s += "<text " + FONT + " x='" + VW * 0.5 + "' y='" + VH * 0.72 + "' text-anchor='middle' font-size='" + VH * 0.075 + "' font-weight='900' fill='#fff'>" + esc(clip(p.headline, 30)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='1.6s' fill='freeze'/></text>";
  s += "<text " + FONT + " x='" + VW * 0.5 + "' y='" + VH * 0.79 + "' text-anchor='middle' font-size='" + VH * 0.042 + "' fill='#b9b9cc'>" + esc(clip(p.sub, 56)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='2.2s' fill='freeze'/></text>";
  s += logoImg(p, VW / 2 - VH * 0.05, VH * 0.84, VH * 0.10);
  return s;
}

/* ---------------- MARQUEE ---------------- */
function tMarquee(p, VW, VH) {
  var s = defs(p);
  s += "<rect width='" + VW + "' height='" + VH + "' fill='url(#g1)'/>";
  var band = "<text " + FONT + " font-size='" + VH * 0.16 + "' font-weight='900' fill='#fff'>" + esc(clip(p.headline, 26).toUpperCase()) + "  •  " + esc(clip(p.headline, 26).toUpperCase()) + "  •  " + esc(clip(p.headline, 26).toUpperCase()) + "</text>";
  s += "<g><g>" + band.replace("<text", "<text x='0' y='" + VH * 0.42 + "'") +
    "<animateTransform attributeName='transform' type='translate' from='0 0' to='" + (-VW * 0.6) + " 0' dur='4s' repeatCount='indefinite'/></g></g>";
  s += "<rect y='" + VH * 0.52 + "' width='" + VW + "' height='" + VH * 0.48 + "' fill='#0d0d12'/>";
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.70 + "' text-anchor='middle' font-size='" + VH * 0.07 + "' font-weight='900' fill='#fff'>" + esc(clip(p.sub, 52)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='1s' fill='freeze'/></text>";
  s += brandMark(p, VW / 2, VH * 0.80, VH * 0.045, p.c2, "middle");
  s += "<rect x='" + (VW / 2 - VW * 0.14) + "' y='" + VH * 0.845 + "' width='" + VW * 0.28 + "' height='" + VH * 0.07 + "' rx='" + VH * 0.035 + "' fill='#fff'>" +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.7s' begin='1.8s' fill='freeze'/></rect>";
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.893 + "' text-anchor='middle' font-size='" + VH * 0.036 + "' font-weight='800' fill='#0d0d12'>" + esc(clip(p.cta, 24)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.7s' begin='1.8s' fill='freeze'/></text>";
  return s;
}

/* ---------------- NOVA ---------------- */
function tNova(p, VW, VH) {
  var s = defs(p);
  s += "<rect width='" + VW + "' height='" + VH + "' fill='#0a0a14'/>";
  var rays = "";
  for (var i = 0; i < 12; i++) {
    rays += "<rect x='" + (VW / 2 - VH * 0.008) + "' y='" + (VH * 0.06) + "' width='" + VH * 0.016 + "' height='" + VH * 0.30 + "' rx='" + VH * 0.008 + "' fill='" + p.c2 + "' opacity='0.5' transform='rotate(" + (i * 30) + " " + VW / 2 + " " + VH * 0.38 + ")'/>";
  }
  s += "<g>" + rays + "<animateTransform attributeName='transform' type='rotate' from='0 " + VW / 2 + " " + VH * 0.38 + "' to='360 " + VW / 2 + " " + VH * 0.38 + "' dur='24s' repeatCount='indefinite'/></g>";
  s += "<circle cx='" + VW / 2 + "' cy='" + VH * 0.38 + "' r='" + VH * 0.13 + "' fill='url(#glow)'/>";
  s += "<circle cx='" + VW / 2 + "' cy='" + VH * 0.38 + "' r='" + VH * 0.085 + "' fill='#fff'>" +
    "<animate attributeName='r' values='" + VH * 0.085 + ";" + VH * 0.105 + ";" + VH * 0.085 + "' keyTimes='0;0.5;1' dur='2.4s' repeatCount='indefinite'/></circle>";
  s += brandMark(p, VW / 2, VH * 0.66, VH * 0.045, p.c2, "middle");
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.79 + "' text-anchor='middle' font-size='" + VH * 0.11 + "' font-weight='900' fill='#fff'>" + esc(clip(p.headline, 32)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.9s' begin='0.9s' fill='freeze'/></text>";
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.885 + "' text-anchor='middle' font-size='" + VH * 0.046 + "' fill='#c9c9da'>" + esc(clip(p.sub, 58)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.9s' begin='1.6s' fill='freeze'/></text>";
  s += logoImg(p, VW - VH * 0.13, VH * 0.05, VH * 0.08);
  return s;
}

/* ---------------- SPARK ---------------- */
function tSpark(p, VW, VH) {
  var s = defs(p);
  s += "<rect width='" + VW + "' height='" + VH + "' fill='#f4f2ec'/>";
  s += "<rect width='" + VW + "' height='" + VH + "' fill='url(#g1)' opacity='0.14'/>";
  var words = clip(p.headline, 40).split(" ");
  var y = VH * 0.42 - (words.length > 3 ? VH * 0.05 : 0);
  var acc = "";
  for (var i = 0; i < Math.min(words.length, 4); i++) {
    acc += "<text " + FONT + " x='" + VW * 0.08 + "' y='" + y + "' font-size='" + VH * 0.16 + "' font-weight='900' fill='#14141a' opacity='0'>" + esc(words[i]) +
      "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.4s' begin='" + (0.4 + i * 0.3) + "s' fill='freeze'/>" +
      "<animateTransform attributeName='transform' type='translate' from='0 " + VH * 0.06 + "' to='0 0' dur='0.4s' begin='" + (0.4 + i * 0.3) + "s' fill='freeze'/></text>";
    y += VH * 0.17;
  }
  s += acc;
  s += "<rect x='" + VW * 0.08 + "' y='" + (y + VH * 0.02) + "' width='" + VW * 0.30 + "' height='" + VH * 0.012 + "' fill='url(#g1)'>" +
    "<animate attributeName='width' from='0' to='" + VW * 0.30 + "' dur='0.6s' begin='1.6s' fill='freeze'/></rect>";
  s += "<text " + FONT + " x='" + VW * 0.08 + "' y='" + (y + VH * 0.13) + "' font-size='" + VH * 0.052 + "' fill='#3c3c46'>" + esc(clip(p.sub, 62)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='1.8s' fill='freeze'/></text>";
  s += brandMark(p, VW * 0.08, VH * 0.14, VH * 0.045, p.c1, "start");
  s += logoImg(p, VW - VH * 0.14, VH * 0.06, VH * 0.08);
  return s;
}

/* ---------------- PIXEL ---------------- */
function tPixel(p, VW, VH) {
  var s = defs(p);
  s += "<rect width='" + VW + "' height='" + VH + "' fill='#0e0e13'/>";
  var cols = 16, rows = 9, cell = Math.min(VW / cols, VH / rows);
  var ox = (VW - cols * cell) / 2, oy = (VH - rows * cell) / 2;
  var grid = "";
  for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
    var on = ((r * 7 + c * 13) % 5 === 0);
    grid += "<rect x='" + (ox + c * cell + 2) + "' y='" + (oy + r * cell + 2) + "' width='" + (cell - 4) + "' height='" + (cell - 4) + "' rx='3' fill='" + (on ? p.c2 : "#1b1b24") + "'>" +
      (on ? "<animate attributeName='opacity' values='0.15;1;0.15' keyTimes='0;0.5;1' dur='" + (1.5 + ((r + c) % 4) * 0.4) + "s' repeatCount='indefinite'/>" : "") + "</rect>";
  }
  s += grid;
  s += "<rect x='" + VW * 0.12 + "' y='" + VH * 0.30 + "' width='" + VW * 0.76 + "' height='" + VH * 0.40 + "' rx='" + VH * 0.03 + "' fill='#0e0e13' opacity='0.88'/>";
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.50 + "' text-anchor='middle' font-size='" + VH * 0.11 + "' font-weight='900' fill='#fff'>" + esc(clip(p.headline, 32)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='0.7s' fill='freeze'/></text>";
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.60 + "' text-anchor='middle' font-size='" + VH * 0.046 + "' fill='#c6c6d6'>" + esc(clip(p.sub, 58)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='1.3s' fill='freeze'/></text>";
  s += brandMark(p, VW / 2, VH * 0.22, VH * 0.042, p.c2, "middle");
  s += logoImg(p, VW - VH * 0.13, VH * 0.05, VH * 0.08);
  return s;
}

/* ---------------- WAVE ---------------- */
function tWave(p, VW, VH) {
  var s = defs(p);
  s += "<rect width='" + VW + "' height='" + VH + "' fill='#0c1017'/>";
  var waves = "";
  for (var i = 0; i < 3; i++) {
    var yb = VH * (0.55 + i * 0.12), amp = VH * 0.05;
    var d = "M0 " + yb + " Q " + VW * 0.125 + " " + (yb - amp * 2) + " " + VW * 0.25 + " " + yb + " T " + VW * 0.5 + " " + yb + " T " + VW * 0.75 + " " + yb + " T " + VW + " " + yb;
    waves += "<g><path d='" + d + "' fill='none' stroke='" + (i === 1 ? p.c2 : p.c1) + "' stroke-width='" + VH * 0.02 + "' opacity='" + (0.9 - i * 0.25) + "'/>" +
      "<animateTransform attributeName='transform' type='translate' from='0 0' to='" + (-VW * 0.25) + " 0' dur='" + (5 - i) + "s' repeatCount='indefinite'/></g>";
  }
  s += waves;
  s += brandMark(p, VW * 0.08, VH * 0.18, VH * 0.045, p.c2, "start");
  s += "<text " + FONT + " x='" + VW * 0.08 + "' y='" + VH * 0.40 + "' font-size='" + VH * 0.14 + "' font-weight='900' fill='#fff'>" + esc(clip(p.headline, 30)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.9s' begin='0.6s' fill='freeze'/></text>";
  s += "<text " + FONT + " x='" + VW * 0.08 + "' y='" + VH * 0.52 + "' font-size='" + VH * 0.052 + "' fill='#c9d4e2'>" + esc(clip(p.sub, 60)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.9s' begin='1.3s' fill='freeze'/></text>";
  s += "<rect x='" + VW * 0.08 + "' y='" + VH * 0.62 + "' width='" + VW * 0.20 + "' height='" + VH * 0.09 + "' rx='" + VH * 0.045 + "' fill='none' stroke='#fff' stroke-width='" + VH * 0.008 + "'>" +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.7s' begin='2s' fill='freeze'/></rect>";
  s += "<text " + FONT + " x='" + VW * 0.18 + "' y='" + VH * 0.682 + "' text-anchor='middle' font-size='" + VH * 0.042 + "' font-weight='800' fill='#fff'>" + esc(clip(p.cta, 22)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.7s' begin='2s' fill='freeze'/></text>";
  return s;
}

/* ---------------- ORBIT ---------------- */
function tOrbit(p, VW, VH) {
  var s = defs(p);
  s += "<rect width='" + VW + "' height='" + VH + "' fill='#080810'/>";
  var stars = "";
  for (var i = 0; i < 40; i++) {
    var sx = (i * 97) % VW, sy = (i * 61) % VH;
    stars += "<circle cx='" + sx + "' cy='" + sy + "' r='" + (1 + i % 2) + "' fill='#fff' opacity='0.5'><animate attributeName='opacity' values='0.2;0.8;0.2' dur='" + (2 + i % 3) + "s' repeatCount='indefinite'/></circle>";
  }
  s += stars;
  var cx = VW * 0.5, cy = VH * 0.42, R = VH * 0.26;
  s += "<ellipse cx='" + cx + "' cy='" + cy + "' rx='" + R + "' ry='" + R * 0.45 + "' fill='none' stroke='" + p.c2 + "' stroke-width='2' opacity='0.6'/>";
  s += "<circle cx='" + cx + "' cy='" + cy + "' r='" + VH * 0.10 + "' fill='url(#g1)'/>";
  s += "<g><circle cx='" + (cx + R) + "' cy='" + cy + "' r='" + VH * 0.035 + "' fill='#fff'/>" +
    "<animateTransform attributeName='transform' type='rotate' from='0 " + cx + " " + cy + "' to='360 " + cx + " " + cy + "' dur='6s' repeatCount='indefinite'/></g>";
  s += "<text " + FONT + " x='" + cx + "' y='" + VH * 0.72 + "' text-anchor='middle' font-size='" + VH * 0.11 + "' font-weight='900' fill='#fff'>" + esc(clip(p.headline, 32)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.9s' begin='0.8s' fill='freeze'/></text>";
  s += "<text " + FONT + " x='" + cx + "' y='" + VH * 0.81 + "' text-anchor='middle' font-size='" + VH * 0.046 + "' fill='#c6c6d6'>" + esc(clip(p.sub, 58)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.9s' begin='1.5s' fill='freeze'/></text>";
  s += brandMark(p, cx, VH * 0.12, VH * 0.042, p.c2, "middle");
  return s;
}

/* ---------------- BLOOM ---------------- */
function tBloom(p, VW, VH) {
  var s = defs(p);
  s += "<rect width='" + VW + "' height='" + VH + "' fill='#f6f3ee'/>";
  var petals = "";
  for (var i = 0; i < 8; i++) {
    petals += "<g transform='rotate(" + (i * 45) + " " + VW / 2 + " " + VH * 0.30 + ")'><ellipse cx='" + VW / 2 + "' cy='" + VH * 0.30 + "' rx='" + VH * 0.05 + "' ry='" + VH * 0.13 + "' fill='" + (i % 2 ? p.c2 : p.c1) + "' opacity='0.85'>" +
      "<animateTransform attributeName='transform' type='scale' values='0.3;1' keyTimes='0;1' dur='1s' begin='" + (0.3 + i * 0.12) + "s' fill='freeze'/></ellipse></g>";
  }
  s += "<g>" + petals + "</g>";
  s += "<circle cx='" + VW / 2 + "' cy='" + VH * 0.30 + "' r='" + VH * 0.055 + "' fill='#14141a'>" +
    "<animate attributeName='r' from='0' to='" + VH * 0.055 + "' dur='0.6s' begin='1.4s' fill='freeze'/></circle>";
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.62 + "' text-anchor='middle' font-size='" + VH * 0.11 + "' font-weight='900' fill='#16161c'>" + esc(clip(p.headline, 32)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='1.2s' fill='freeze'/></text>";
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.71 + "' text-anchor='middle' font-size='" + VH * 0.048 + "' fill='#55555f'>" + esc(clip(p.sub, 58)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='1.8s' fill='freeze'/></text>";
  s += brandMark(p, VW / 2, VH * 0.84, VH * 0.042, p.c1, "middle");
  s += logoImg(p, VW - VH * 0.13, VH * 0.05, VH * 0.08);
  return s;
}

/* ---------------- PULSE ---------------- */
function tPulse(p, VW, VH) {
  var s = defs(p);
  s += "<rect width='" + VW + "' height='" + VH + "' fill='#0b0b10'/>";
  var rings = "";
  for (var i = 0; i < 4; i++) {
    rings += "<circle cx='" + VW / 2 + "' cy='" + VH * 0.44 + "' r='" + VH * 0.08 + "' fill='none' stroke='" + p.c2 + "' stroke-width='3'>" +
      "<animate attributeName='r' from='" + VH * 0.08 + "' to='" + VH * 0.42 + "' dur='2.6s' begin='" + (i * 0.65) + "s' repeatCount='indefinite'/>" +
      "<animate attributeName='opacity' values='0.8;0' keyTimes='0;1' dur='2.6s' begin='" + (i * 0.65) + "s' repeatCount='indefinite'/></circle>";
  }
  s += rings;
  s += "<circle cx='" + VW / 2 + "' cy='" + VH * 0.44 + "' r='" + VH * 0.07 + "' fill='url(#g1)'/>";
  s += brandMark(p, VW / 2, VH * 0.16, VH * 0.045, "#fff", "middle");
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.70 + "' text-anchor='middle' font-size='" + VH * 0.11 + "' font-weight='900' fill='#fff'>" + esc(clip(p.headline, 32)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='0.7s' fill='freeze'/></text>";
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.79 + "' text-anchor='middle' font-size='" + VH * 0.046 + "' fill='#c9c9da'>" + esc(clip(p.sub, 58)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.8s' begin='1.3s' fill='freeze'/></text>";
  s += "<rect x='" + (VW / 2 - VW * 0.11) + "' y='" + VH * 0.845 + "' width='" + VW * 0.22 + "' height='" + VH * 0.075 + "' rx='" + VH * 0.04 + "' fill='#fff'>" +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.7s' begin='2s' fill='freeze'/></rect>";
  s += "<text " + FONT + " x='" + VW / 2 + "' y='" + VH * 0.895 + "' text-anchor='middle' font-size='" + VH * 0.038 + "' font-weight='800' fill='#0b0b10'>" + esc(clip(p.cta, 22)) +
    "<animate attributeName='opacity' values='0;1' keyTimes='0;1' dur='0.7s' begin='2s' fill='freeze'/></text>";
  return s;
}

var TEMPLATES = [
  { id: "ember",   name: "Ember",   aspects: ["16:9"],          duration: 12, cat: "launches",   desc: "Rising sparks over a dark stage. Made for product launches and bold announcements.", fn: tEmber },
  { id: "money",   name: "Money",   aspects: ["16:9"],          duration: 10, cat: "services",   desc: "Floating coins on a brand gradient. For payments, pricing and money products.", fn: tMoney },
  { id: "horizon", name: "Horizon", aspects: ["16:9"],          duration: 12, cat: "brand",      desc: "A sun rising over your colours. Brand intros and campaign kickoffs.", fn: tHorizon },
  { id: "capsule", name: "Capsule", aspects: ["9:16"],          duration: 11, cat: "social",     desc: "Pills of colour sliding into place. Vertical stories, reels and shorts.", fn: tCapsule },
  { id: "marquee", name: "Marquee", aspects: ["9:16"],          duration: 10, cat: "events",     desc: "A scrolling headline band. Event announcements and countdown-style teasers.", fn: tMarquee },
  { id: "nova",    name: "Nova",    aspects: ["16:9", "9:16"],  duration: 12, cat: "launches",   desc: "A rotating starburst reveal. Big launches that need a little drama.", fn: tNova },
  { id: "spark",   name: "Spark",   aspects: ["16:9", "9:16"],  duration: 9,  cat: "brand",      desc: "Words that slam in, one by one. Clean light theme for studios and agencies.", fn: tSpark },
  { id: "pixel",   name: "Pixel",   aspects: ["16:9"],          duration: 10, cat: "services",   desc: "A living grid of light behind your message. Tech and dev-tool brands.", fn: tPixel },
  { id: "wave",    name: "Wave",    aspects: ["16:9"],          duration: 11, cat: "services",   desc: "Drifting waves in your brand colours. Calm, confident service intros.", fn: tWave },
  { id: "orbit",   name: "Orbit",   aspects: ["16:9", "9:16"],  duration: 12, cat: "brand",      desc: "Your brand at the centre of its own little universe. Logo moments.", fn: tOrbit },
  { id: "bloom",   name: "Bloom",   aspects: ["16:9", "9:16"],  duration: 10, cat: "shops",      desc: "Petals opening in soft colour. Shops, makers and gentle brand stories.", fn: tBloom },
  { id: "pulse",   name: "Pulse",   aspects: ["16:9", "9:16"],  duration: 10, cat: "events",     desc: "Expanding rings with a clear call to action. Announcements that convert.", fn: tPulse }
];

var ASPECTS = { "16:9": [1600, 900], "9:16": [900, 1600] };

function defaultParams() {
  return {
    brand: "Your Brand", headline: "Your headline here", sub: "One clear sentence about what you do.",
    cta: "Learn more", c1: "#7c5cff", c2: "#ff7ad9", logo: ""
  };
}

function renderTemplate(id, p, aspect) {
  var t = null;
  for (var i = 0; i < TEMPLATES.length; i++) if (TEMPLATES[i].id === id) t = TEMPLATES[i];
  if (!t) t = TEMPLATES[0];
  p = Object.assign(defaultParams(), p || {});
  var dim = ASPECTS[aspect] || ASPECTS["16:9"];
  var VW = dim[0], VH = dim[1];
  var inner = t.fn(p, VW, VH);
  var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 " + VW + " " + VH + "' width='" + VW + "' height='" + VH + "'>" + inner + "</svg>";
  return { svg: svg, duration: t.duration, width: VW, height: VH, template: t };
}

if (typeof module !== "undefined") module.exports = { TEMPLATES: TEMPLATES, renderTemplate: renderTemplate, defaultParams: defaultParams };
