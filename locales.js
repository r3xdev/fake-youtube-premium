const LOCALES = {
    en: {
        extensionName: 'Fake Youtube Premium',
        extensionDescription: 'Swap the YouTube logo to the Premium version.',
        legendSettings: 'Settings',
        toggleLogoTitle: 'Premium Logo',
        toggleLogoDesc: 'Swap the YouTube logo to Premium',
        textDeveloper: 'by r3xdev',
        openGitHub: 'Open GitHub',
    },
    id: {
        extensionName: 'Fake Youtube Premium',
        extensionDescription: 'Mengganti logo YouTube ke versi Premium.',
        legendSettings: 'Pengaturan',
        toggleLogoTitle: 'Logo Premium',
        toggleLogoDesc: 'Ganti logo YouTube ke versi Premium',
        textDeveloper: 'oleh r3xdev',
        openGitHub: 'Buka GitHub',
    },
};

function getMessage(key) {
    const lang = (navigator.language || 'en').split('-')[0].toLowerCase();
    return LOCALES[lang]?.[key] ?? LOCALES.en[key] ?? key;
}
