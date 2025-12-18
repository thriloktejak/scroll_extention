console.log('[AutoScroll] Content script loaded')

if (window.__autoScrollInitialized) {
  console.log('[AutoScroll] Already initialized')
} else {
  window.__autoScrollInitialized = true

  let scrollIntervalId = null
  let autoScrollEnabled = true
  let alertHandledOnce = false
  let scrollIntervalMs = 30_000 // default 30s

  function scrollUpDown(reason) {
    console.log(`[AutoScroll] ACTION (${reason}): Scroll UP`)
    window.scrollBy({ top: -800 })

    setTimeout(() => {
      console.log(`[AutoScroll] ACTION (${reason}): Scroll DOWN`)
      window.scrollBy({ top: 800 })
    }, 800)
  }

  function startPeriodicScroll() {
    if (!autoScrollEnabled || scrollIntervalId) return

    console.log(
      `[AutoScroll] ⏱ Auto-scroll ENABLED (${scrollIntervalMs / 1000}s)`
    )

    scrollIntervalId = setInterval(() => {
      scrollUpDown('timer')
    }, scrollIntervalMs)
  }

  function stopPeriodicScroll() {
    if (scrollIntervalId) {
      clearInterval(scrollIntervalId)
      scrollIntervalId = null
      console.log('[AutoScroll] ⏹ Auto-scroll DISABLED')
    }
  }

  function restartPeriodicScroll() {
    stopPeriodicScroll()
    startPeriodicScroll()
  }

  function detectTelusAlert() {
    const overlay = document.getElementById('telus-productivity-alert-overlay')
    const iframe = document.getElementById('telus-productivity-alert-host')

    if (overlay && iframe && !alertHandledOnce) {
      alertHandledOnce = true
      console.log('[AutoScroll] 🚨 Telus alert detected')
      scrollUpDown('telus-alert')
    }
  }

  function observeAlert() {
    const observer = new MutationObserver(detectTelusAlert)
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    })
  }

  // Messages from popup
  chrome.runtime.onMessage.addListener(msg => {
    if (msg.type === 'TOGGLE_SCROLL') {
      autoScrollEnabled = msg.enabled
      autoScrollEnabled ? startPeriodicScroll() : stopPeriodicScroll()
    }

    if (msg.type === 'UPDATE_INTERVAL') {
      scrollIntervalMs = msg.seconds * 1000
      console.log(
        `[AutoScroll] ⏱ Interval updated to ${msg.seconds}s`
      )
      if (autoScrollEnabled) restartPeriodicScroll()
    }
  })

  function init() {
    chrome.storage.local.get(
      ['autoScrollEnabled', 'scrollIntervalSeconds'],
      result => {
        autoScrollEnabled = result.autoScrollEnabled ?? true
        scrollIntervalMs =
          (result.scrollIntervalSeconds ?? 30) * 1000

        autoScrollEnabled ? startPeriodicScroll() : stopPeriodicScroll()
      }
    )

    observeAlert()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
}
