// netlify/functions/recolor.js
import fetch from 'node-fetch';

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const imageUrl = body.imageUrl;  // URL gambar yang mau diganti warnanya
    const color = body.color;        // warna baru dalam format hex, misal "#ff0000"

    // Ganti URL API berikut dengan endpoint Google AI yang elu pakai
    const response = await fetch('https://google-ai-api-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GOOGLE_API_KEY}`,
      },
      body: JSON.stringify({ imageUrl, color }),
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
