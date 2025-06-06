# Thought Crime – Browser Extension

**Thought Crime** is a browser extension that alerts you when your search query would be illegal or censored in other countries.  
It serves as a reminder of how valuable and fragile our freedom of expression is.

---

## Why This Matters

In many parts of the world, what you say, search, or even think can get you:
- Arrested
- Fined
- Silenced
- Imprisoned

This extension helps raise awareness about those global restrictions by showing you **which countries would criminalize your search**.  
It is a tool for **digital consciousness and education**, not surveillance.

---

## Features

- Detects sensitive search terms on:
  - Google
  - Bing
  - DuckDuckGo
  - Brave Search
- Displays a warning popup if your search query includes topics forbidden in other countries.
- Offline, client-side only. No data is sent or collected.

---

## Install Instructions

### Firefox

1. Open Firefox and go to: `about:debugging`
2. Click **"This Firefox"** on the left menu.
3. Click **"Load Temporary Add-on..."**
4. Select any file inside the `thought-crime` folder (e.g., `manifest.json`)
5. Start searching on Google, Bing, etc. to test it.

### Chrome (or Brave)

1. Open Chrome and go to: `chrome://extensions/`
2. Enable **Developer Mode** (top right)
3. Click **"Load unpacked"**
4. Select the `thought-crime` folder
5. Use any supported search engine to see it in action

---

## File Structure

thought-crime/
├── manifest.json # Extension definition
├── content.js # Core detection logic
├── forbidden.json # Search topic database
└── README.md # This file

---

## Disclaimer

This extension is educational.  
It is **not** legal advice and does **not** reflect real-time censorship updates.  
The list of forbidden topics is simplified and manually compiled. Real-world laws may vary or change.

---

## Purpose

> “The price of freedom is eternal vigilance.”  
> — Thomas Jefferson (allegedly)

We often forget how free we are—until we aren't.  
Use this tool to appreciate your rights and reflect on those who are still fighting for theirs.
