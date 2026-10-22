
const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");
const messages = document.getElementById("chatMessages");
const statusText = document.getElementById("chatStatus");
const sendButton = document.getElementById("chatSend");
let isSending = false;

function showMessage(text, kind) {
  const p = document.createElement("p");

  p.className =
    kind === "user" ? "user-message" : "bot-message";

  p.textContent = text;
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage(event) {
  event.preventDefault();

  if (isSending) {
    return;
  }

  const question = input.value.trim();

  if (!question) {
    setStatus("Please type a question.", "error");
    return;
  }

  if (!CONFIG.apiKey) {
    setStatus("The assistant is not configured right now.", "error");
    return;
  }

  showMessage(question, "user");
  input.value = "";
  isSending = true;
  sendButton.disabled = true;
  setStatus("Thinking...", "loading");

  try {
    const response = await fetch(
      `${CONFIG.baseUrl}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CONFIG.apiKey}`
        },
        body: JSON.stringify({
          model: CONFIG.model,
          temperature: 0.7,
          messages: [
            {
              role: "system",
              content:
                "You are Riya Shevkani's portfolio assistant. Riya is a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning. Her listed areas include Python, C++, data structures, HTML, CSS, JavaScript, and AI/ML fundamentals. Her projects are a Python factorial calculator, a Python Fibonacci sequence program, and Struct to dict, which converts structured data to a dictionary. Answer clearly and briefly using only these facts. If you do not know something, say so rather than inventing it."
            },
            {
              role: "user",
              content: question
            }
          ]
        })
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("The assistant could not authenticate. Please try again later.");
      }

      if (response.status === 429) {
        throw new Error("Too many requests. Wait a moment and try again.");
      }

      throw new Error(`The assistant is unavailable (HTTP ${response.status}).`);
    }

    const data = await response.json();

    const reply =
      data.choices?.[0]?.message?.content;

    if (!reply) {
      throw new Error("No reply was received. Please try again.");
    }

    showMessage(reply, "bot");
    setStatus("", "");

  } catch (error) {
    setStatus(error.message || "The assistant is unavailable. Please try again.", "error");

  } finally {
    isSending = false;
    sendButton.disabled = false;
  }
}

function setStatus(message, state) {
  statusText.textContent = message;
  statusText.dataset.state = state;
}

if (form && input && messages && statusText && sendButton) {
  form.addEventListener("submit", sendMessage);

  document.querySelectorAll("[data-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      if (isSending) {
        return;
      }

      input.value = button.dataset.prompt;
      form.requestSubmit();
    });
  });
}
