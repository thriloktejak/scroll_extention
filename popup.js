const btn = document.getElementById('toggleBtn')
const intervalInput = document.getElementById('intervalInput')

// Load saved settings
chrome.storage.local.get(
  ['autoScrollEnabled', 'scrollIntervalSeconds'],
  result => {
    const enabled = result.autoScrollEnabled ?? true
    const interval = result.scrollIntervalSeconds ?? 30

    intervalInput.value = interval
    updateButton(enabled)
  }
)

// Toggle ON/OFF
btn.addEventListener('click', () => {
  chrome.storage.local.get(['autoScrollEnabled'], result => {
    const newValue = !(result.autoScrollEnabled ?? true)

    chrome.storage.local.set({ autoScrollEnabled: newValue }, () => {
      updateButton(newValue)
      sendMessageToTab({
        type: 'TOGGLE_SCROLL',
        enabled: newValue
      })
    })
  })
})

// Change interval
intervalInput.addEventListener('change', () => {
  const seconds = Number(intervalInput.value)

  if (seconds < 5) return

  chrome.storage.local.set(
    { scrollIntervalSeconds: seconds },
    () => {
      sendMessageToTab({
        type: 'UPDATE_INTERVAL',
        seconds
      })
    }
  )
})

function sendMessageToTab(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (!tabs || !tabs.length) return

    chrome.tabs.sendMessage(tabs[0].id, message, () => {
      if (chrome.runtime.lastError) {
        console.log('[Popup] No content script in this tab')
      }
    })
  })
}

function updateButton(enabled) {
  btn.textContent = enabled ? 'Auto Scroll: ON' : 'Auto Scroll: OFF'
  btn.className = enabled ? 'on' : 'off'
}
