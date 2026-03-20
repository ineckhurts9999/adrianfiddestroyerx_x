const fetch = require("node-fetch");

const WEBHOOK_URL = "https://discord.com/api/webhooks/1483723007263506472/uudYabPa3QsygEeKiz1ErF3rGqSML6dkVSuldC3hr5-vfnknxYa9KIP2XOYT8IDTLxpq";

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const now = new Date();

  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "👁️ New Visitor",
        color: 0x00d4ff,
        fields: [
          { name: "🌐 IP Address", value: body.ip || "Unknown", inline: true },
          { name: "📍 Location", value: (body.city || "?") + ", " + (body.country || "?"), inline: true },
          { name: "📡 ISP", value: body.isp || "Unknown", inline: false },
          { name: "📱 Device", value: body.device || "Unknown", inline: false },
          { name: "🕐 Timezone", value: body.timezone || "Unknown", inline: true },
          { name: "🗣️ Language", value: body.language || "Unknown", inline: true },
          { name: "🖥️ Screen", value: body.screen || "Unknown", inline: true },
          { name: "💾 Memory", value: body.memory || "Unknown", inline: true },
          { name: "⚙️ CPU Cores", value: String(body.cores || "Unknown"), inline: true },
          { name: "🔋 Battery", value: body.battery || "Unknown", inline: true }
        ],
        footer: { text: "Visitor Log • " + now.toUTCString() },
        timestamp: now.toISOString()
      }]
    })
  });

  return { statusCode: 200, body: "OK" };
};
