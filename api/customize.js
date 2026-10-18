// Meowtion Graphics — AI copywriter proxy.
// Browser -> POST /api/customize -> xKiro (OpenAI-compatible).
// The real XKIRO_API_KEY lives only in the Vercel env var — never in code.

var XKIRO_URL = "https://api.xkiro.com/v1/chat/completions";
var MODEL = "meituan/longcat-2.5-preview:free";
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function clean(s, n) {
  s = String(s || "").replace(/[\r\n]+/g, " ").trim();
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

module.exports = async function (req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  var key = process.env.XKIRO_API_KEY;
  if (!key) return res.status(500).json({ error: "AI is not configured yet." });

  var body = req.body || {};
  var template = clean(body.template, 40) || "ember";
  var aspect = body.aspect === "9:16" ? "9:16" : "16:9";
  var brief = clean(body.brief, 500);
  var brand = clean(body.brand, 40) || "Your Brand";
  if (!brief) return res.status(400).json({ error: "Brief is required." });

  var prompt =
    "You write short punchy copy for an animated brand video.\n" +
    "Template: " + template + " (" + aspect + ")\n" +
    "Brand: " + brand + "\n" +
    "Brief: " + brief + "\n\n" +
    "Reply with ONLY a JSON object, no markdown fences, no other text:\n" +
    '{"headline":"max 30 chars, punchy","sub":"max 60 chars, one clear sentence","cta":"max 18 chars, e.g. Shop now"}';

  try {
    var upstream = await fetch(XKIRO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + key,
        "User-Agent": UA,
        "Accept": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are a concise advertising copywriter. You always reply with a single JSON object and nothing else." },
          { role: "user", content: prompt }
        ],
        max_tokens: 220,
        temperature: 0.8
      })
    });
    var data = await upstream.json().catch(function () { return {}; });
    if (!upstream.ok) {
      return res.status(502).json({ error: "AI engine error.", upstreamStatus: upstream.status, detail: clean(JSON.stringify(data), 200) });
    }
    var text = ((data.choices || [])[0] || {}).message
      ? (data.choices[0].message.content || "") : "";
    var m = text.match(/\{[\s\S]*\}/);
    var out = {};
    var parsed = false;
    try { out = JSON.parse(m ? m[0] : text); parsed = true; } catch (e) { out = {}; }
    var resp = {
      headline: clean(out.headline, 34) || "Your headline here",
      sub: clean(out.sub, 64) || "",
      cta: clean(out.cta, 22) || "Learn more"
    };
    if (!parsed) resp.debug = { upstreamOk: upstream.ok, raw: clean(text, 160) };
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(502).json({ error: "AI didn't respond.", reason: clean(String(e && e.message || e), 120) });
  }
};
