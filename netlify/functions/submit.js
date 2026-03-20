const fetch = require("node-fetch");

const WEBHOOK_URL = "https://discord.com/api/webhooks/1483723007263506472/uudYabPa3QsygEeKiz1ErF3rGqSML6dkVSuldC3hr5-vfnknxYa9KIP2XOYT8IDTLxpq";

exports.handler = async (event) => {
  const ip = event.headers["x-forwarded-for"] || event.headers["client-ip"] || "Unknown";
  const { name, message, device } = JSON.parse(event.body);

  const now = new Date();

  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "👁️ New Visitor",
        color: 0x00d4ff,
        fields: [
          { name: "🌐 IP Address", value: message, inline: true },
          { name: "📱 Device", value: device || "Unknown", inline: false },
          { name: "🕐 Time", value: now.toUTCString(), inline: false }
        ],
        footer: { text: "Zenith Staff Book • Visitor Log" },
        timestamp: now.toISOString()
      }]
    })
  });

  return {
    statusCode: 200,
    body: "OK"
  };
};
