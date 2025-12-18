Below is a **clean, professional `README.md`** you can directly use for your Chrome extension.
It is written in a **standard open-source / project documentation style** and matches the functionality you built.

You can copy–paste this into a file named **`README.md`** in your extension folder.

---

```md
# Auto Scroll Controller – Chrome Extension

## Overview

**Auto Scroll Controller** is a Chrome extension that automatically scrolls the current web page at a configurable time interval.  
It also detects the **Telus Productivity alert iframe** and performs an immediate scroll when the alert appears.

The extension provides a **popup UI** that allows users to:
- Enable or disable auto-scrolling
- Configure the scroll interval (in seconds)
- Apply changes instantly without reloading the page

> ⚠️ Note: This extension performs page scrolling only. It does not simulate real mouse or keyboard input.

---

## Features

- ✅ Automatic scroll every *N* seconds (user configurable)
- ✅ Instant scroll when Telus Productivity alert iframe appears
- ✅ Popup toggle to enable / disable auto-scroll
- ✅ Interval update applied live (no page refresh required)
- ✅ Debug logs for easy testing
- ✅ Lightweight and Chrome Manifest V3 compliant

---

## How It Works

1. A **content script** runs on all normal web pages.
2. When auto-scroll is enabled:
   - The page scrolls **up and down** at the configured interval.
3. A `MutationObserver` continuously monitors the DOM.
4. If the Telus Productivity alert overlay is detected:
   - A one-time immediate scroll is triggered.
5. The popup UI communicates with the content script using Chrome messaging.

---

## Folder Structure

```

auto-scroll-extension/
├── manifest.json
├── content.js
├── popup.html
├── popup.js
└── README.md

```

---

## Installation (Developer Mode)

1. Open Chrome and go to:
```

chrome://extensions

```
2. Enable **Developer mode** (top-right corner).
3. Click **Load unpacked**.
4. Select the project folder.
5. The extension will appear in the toolbar.

---

## Usage

1. Open any normal website (not `chrome://` pages).
2. Click the extension icon.
3. Set the scroll interval (in seconds).
4. Toggle **Auto Scroll ON / OFF**.
5. Changes take effect immediately.

---

## Popup Controls

- **Scroll interval (seconds)**  
Sets how often the page scrolls automatically.

- **Auto Scroll: ON / OFF**  
Enables or disables the periodic scrolling.
- When OFF: only Telus alert detection remains active.

---

## Debugging

Open **DevTools → Console** on the page to view logs such as:

```

[AutoScroll] Content script loaded
[AutoScroll] ⏱ Auto-scroll ENABLED (30s)
[AutoScroll] ACTION (timer): Scroll UP
[AutoScroll] ACTION (timer): Scroll DOWN
[AutoScroll] 🚨 Telus alert detected

```

These logs confirm that the extension is running correctly.

---

## Limitations

- ❌ Does not simulate real user activity (mouse/keyboard)
- ❌ Cannot dismiss or interact with other extensions’ UI
- ❌ Does not run on `chrome://` or `chrome-extension://` pages
- ❌ Scrolling may not be visually noticeable when a fixed overlay is present

These are enforced Chrome security restrictions.

---

## Permissions Used

- `storage` – Save user preferences
- `tabs` – Communicate with the active tab

No external network or sensitive permissions are used.

---

## Compatibility

- Google Chrome (Manifest V3)
- Chromium-based browsers (Edge, Brave)

---

## License

This project is provided for **educational and internal use**.  
You may modify and extend it as needed.

---

## Author

Developed by **Thrilok Teja Kolipaka**

```

---

If you want, I can also:

* Simplify it for GitHub
* Add screenshots section
* Add “How to build” section
* Add version changelog
* Customize it for Chrome Web Store submission

Just tell me what you want next.
