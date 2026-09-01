/**
 * Chat Service
 * Communicates with the backend server endpoint POST /api/chat.
 * All Gemini interactions and API keys stay on the backend server.
 */

export async function sendChatMessage({
  message,
  history = [],
  sentiment = null,
  emotions = null
}) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      history,
      sentiment,
      emotions
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Server returned status ${response.status}`);
  }

  return data;
}
