const fetch = require("node-fetch");

const WEBHOOK_URL = "https://discord.com/api/webhooks/1484099492541108224/L9yeG4TNtP5YEKOY1FL6WBOfC-s5alJWyWal967XlqJD6mJVVe2vJ8CQCFxF5kyTFNEr";

exports.handler = async (event) => {
  const ip = event.headers["x-forwarded-for"] || event.headers["client-ip"] || "Unknown";
  const { name, message } = JSON.parse(event.body);

  const now = new Date();

  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "👁️ New Visitor",
        color: 0x00d4ff,
        fields: [
          { name: "🌐 IP Address", value: ip, inline: true },
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
