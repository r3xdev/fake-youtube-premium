(() => {
    const api = typeof browser !== 'undefined' ? browser : chrome;
    const DEFAULTS = { logoEnabled: true };

    api.runtime.onMessage.addListener((message, _sender, sendResponse) => {
        if (message.type === 'getSettings') {
            api.storage.sync.get(DEFAULTS, sendResponse);
            return true;
        }
    });

    function isYouTube(url) {
        if (!url) return false;
        try {
            const { hostname } = new URL(url);
            return hostname === 'youtube.com' || hostname === 'www.youtube.com' || hostname === 'm.youtube.com';
        } catch {
            return false;
        }
    }

    function updateActionState(tabId, url) {
        if (isYouTube(url)) {
            api.action.enable(tabId);
        } else {
            api.action.disable(tabId);
        }
    }

    api.tabs.onActivated.addListener(({ tabId }) => {
        api.tabs.get(tabId, (tab) => updateActionState(tabId, tab.url));
    });

    api.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.url !== undefined) {
            updateActionState(tabId, changeInfo.url);
        }
    });

    api.runtime.onInstalled.addListener((details) => {
        api.action.disable();

        if (
            details.reason === "browser_update" ||
            details.reason === "chrome_update" ||
            details.reason === "update"
        ) {
            return;
        } else if (details.reason === "install") {
            api.tabs.create({ url: "https://github.com/r3xdev" });
        }
    });

})()