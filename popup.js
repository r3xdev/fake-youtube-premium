const DEFAULTS = { logoEnabled: true };

const YOUTUBE_TAB_URLS = [
    '*://youtube.com/*',
    '*://www.youtube.com/*',
    '*://m.youtube.com/*',
];

function getSettings() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(DEFAULTS, resolve);
    });
}

function notifyYouTubeTabs(message) {
    chrome.tabs.query({ url: YOUTUBE_TAB_URLS }, (tabs) => {
        tabs.forEach((tab) => {
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, message).catch(() => {});
            }
        });
    });
}

function saveAndNotify(key, value) {
    chrome.storage.sync.set({ [key]: value });
    notifyYouTubeTabs({ type: 'settingChanged', key, value });
}

function applyI18n() {
    document.querySelector('.header h1').textContent = chrome.i18n.getMessage('legendSettings');
    document.querySelector('[data-i18n="logoTitle"]').textContent = chrome.i18n.getMessage('toggleLogoTitle');
    document.querySelector('[data-i18n="logoDesc"]').textContent = chrome.i18n.getMessage('toggleLogoDesc');
    document.querySelector('.footer').textContent =
        `${chrome.i18n.getMessage('extensionName')} — ${chrome.i18n.getMessage('textDeveloper')}`;
}

document.addEventListener('DOMContentLoaded', async () => {
    applyI18n();

    const settings = await getSettings();
    const logoToggle = document.getElementById('toggle-logo');

    logoToggle.checked = settings.logoEnabled;

    logoToggle.addEventListener('change', () => {
        saveAndNotify('logoEnabled', logoToggle.checked);
    });
});
