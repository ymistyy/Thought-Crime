console.log("Thought Crime content.js loaded");

const runtime = chrome?.runtime ?? browser?.runtime;

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j],    
          dp[i][j - 1],    
          dp[i - 1][j - 1] 
        ) + 1;
      }
    }
  }

  return dp[m][n];
}

fetch(runtime.getURL("forbidden.json"))
  .then(response => response.json())
  .then(data => {
    const query = new URLSearchParams(window.location.search).get("q");
    if (!query) return;

    const lowerQuery = query.toLowerCase();
    const words = lowerQuery.split(/\W+/);
    const threshold = 2;
    let foundCountries = new Set();

    for (const term in data) {
      const termLower = term.toLowerCase();

      if (lowerQuery.includes(termLower)) {
        data[term].forEach(c => foundCountries.add(c));
        continue;
      }

      for (const word of words) {
        const distance = levenshtein(word, termLower);
        if (distance <= threshold || word.includes(termLower)) {
          data[term].forEach(c => foundCountries.add(c));
          break; 
        }
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
      popup.innerText =
        `🧠 Thought Crime Committed\n` +
        `This query is illegal in:\n${[...foundCountries].join(", ")}\n\n` +
        `🔢 Total Violations: ${currentCount}`;
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
