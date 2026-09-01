/**
 * Chat Service
 * Communicates with the backend server endpoint POST /api/chat.
 * Passes conversation history, message, emotional signals, and current wellbeing context.
 */

export async function sendChatMessage({
  message,
  history = [],
  context = null,
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
      context,
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
