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
    document.querySelector('.header h1').textContent = getMessage('legendSettings');
    document.querySelector('[data-i18n="logoTitle"]').textContent = getMessage('toggleLogoTitle');
    document.querySelector('[data-i18n="logoDesc"]').textContent = getMessage('toggleLogoDesc');
    const footer = document.getElementById('footer-github');
    footer.textContent =
        `${getMessage('extensionName')} — ${getMessage('textDeveloper')}`;
    footer.title = getMessage('openGitHub');
}

document.addEventListener('DOMContentLoaded', async () => {
    applyI18n();

    document.getElementById('ext-version').textContent = `v${chrome.runtime.getManifest().version}`;

    const footer = document.getElementById('footer-github');
    footer.href = chrome.runtime.getManifest().homepage_url;
    footer.addEventListener('click', (e) => {
        e.preventDefault();
        chrome.tabs.create({ url: footer.href });
    });

    const settings = await getSettings();
    const logoToggle = document.getElementById('toggle-logo');

    logoToggle.checked = settings.logoEnabled;

    logoToggle.addEventListener('change', () => {
        saveAndNotify('logoEnabled', logoToggle.checked);
    });
});
