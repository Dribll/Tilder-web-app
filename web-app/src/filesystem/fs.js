import * as browser from "browserFS"
import * as tauri from "tauriFS"

const isTauri = !!window.__TAURI__

export const FS = isTauri ? tauri : browser