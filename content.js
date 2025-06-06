
console.log("Thought Crime content.js loaded");

const runtime = chrome?.runtime ?? browser?.runtime;

fetch(runtime.getURL("forbidden.json"))
  .then(response => response.json())
  .then(data => {
    const query = new URLSearchParams(window.location.search).get("q");
    if (!query) return;

    const lowerQuery = query.toLowerCase();
    let foundCountries = new Set();

    for (const term in data) {
      if (lowerQuery.includes(term)) {
        data[term].forEach(c => foundCountries.add(c));
      }
    }

    if (foundCountries.size > 0) {
      const counterKey = "thoughtCrimeCount";
      let currentCount = parseInt(localStorage.getItem(counterKey)) || 0;
      localStorage.setItem(counterKey, ++currentCount);

      const popup = document.createElement("div");
      popup.style.position = "fixed";
      popup.style.bottom = "20px";
      popup.style.right = "20px";
      popup.style.zIndex = "99999";
      popup.style.backgroundColor = "#111";
      popup.style.color = "white";
      popup.style.padding = "15px";
      popup.style.borderRadius = "8px";
      popup.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
      popup.style.fontFamily = "monospace";
      popup.innerText = `🧠 Thought Crime Committed\nThis query is illegal in:\n${[...foundCountries].join(", ")}\n\n🔢 Total Violations: ${currentCount}`;
      document.body.appendChild(popup);

      const audio = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
      audio.play().catch(() => {});

      setTimeout(() => {
        popup.remove();
      }, 10000);
    } else {
      console.log("No restricted terms found in query.");
    }
  })
  .catch(e => console.error("Failed to load forbidden.json:", e));
