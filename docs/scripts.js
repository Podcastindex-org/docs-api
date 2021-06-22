let loadingDone = false
const settingsKey = "pi_docs"
let settings = JSON.parse(window.localStorage.getItem(settingsKey))
const defaultSettings = {
    "theme": "light",
    "autoTheme": true,
}
let rapiDocRoot = null

/**
 * Get the opposite theme name
 *
 * @param theme {"dark" | "light"} Theme name
 * @return {"dark" | "light"} Opposite theme name
 **/
const oppositeTheme = (theme) => {
    return theme === "dark" ? "light" : "dark"
}

/**
 * Convert string to title case
 *
 * @param value {string} string to change case of
 * @return {string} string where words are now in title case format
 */
const toTitleCase = (value) => {
    return value.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

/**
 * Set the theme that should be used
 *
 * @param theme {"dark" | "light"} Theme name
 */
const setTheme = (theme) => {
    rapiDocRoot.setAttribute("theme", theme)

    const toggle = document.querySelector('.theme-toggle')
    toggle.setAttribute("data-theme", theme)
    toggle.setAttribute(
        "title",
        `${toTitleCase(oppositeTheme(theme))} Mode`
    )

    settings.theme = theme
}

/**
 * Handle theme toggle.
 *
 * Changes theme to the opposite and updates local storage with new value
 */
const toggleTheme = () => {
    // if button pressed, disable auto detection
    settings.autoTheme = false

    setTheme(oppositeTheme(settings.theme))
    saveSettings()
}

/**
 * Revert settings to the default values
 */
const revertSettings = () => {
    settings = {...defaultSettings}

    // check for auto theme
    if (settings.autoTheme) {
        // detect
        if (window.matchMedia) {
            settings.theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
        } else {
            // disable if not supported
            settings.autoTheme = false
        }
    }

    setTheme(settings.theme)
    saveSettings()
}

/**
 * Load values from local settings. If none exist, set to default values
 */
const loadSettings = () => {
    if (settings === null) {
        // set default values
        revertSettings()
    }
}

/**
 * Save values to local settings
 */
const saveSettings = () => {
    window.localStorage.setItem(settingsKey, JSON.stringify(settings))
}

/**
 * Handle DOMContentLoaded event
 */
const loaded = () => {
    const rapiDocDOM = rapiDocRoot.shadowRoot
    if (rapiDocDOM === undefined) {
        // since cannot detect shadow dom load, add slight delay
        setTimeout(loaded, 5)
    }

    // if already loaded, return (handle recursive calls)
    if (loadingDone) {
        return
    }
    loadingDone = true

    const style = document.createElement('style')
    // noinspection JSDeprecatedSymbols
    style.type = "text/css"
    // language=css
    style.appendChild(document.createTextNode(`
        ::placeholder {
            color: #ccc !important
        }

        /*noinspection CssUnusedSymbol*/
        .nav-bar-tag {
            background: #444 !important
        }
    `))
    rapiDocDOM.appendChild(style)

    loadSettings()

    // set theme
    setTheme(settings.theme)
    saveSettings()
}

window.addEventListener('DOMContentLoaded', () => {
    // set global
    rapiDocRoot = document.querySelector('#doc-root')

    loaded()
});
