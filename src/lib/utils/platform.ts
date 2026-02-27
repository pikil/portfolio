// Inspired by https://github.com/quasarframework/quasar/blob/dev/ui/src/plugins/platform/Platform.js

import { browser } from '$app/environment'
import { arrayHasItems } from '$utils/validation'

interface Details {
  browser: string;
  version: string;
  platform: string;
}

let ua: string = ''

let details:Details|null = null

const getUa = () => {
  if (browser && !ua)
    // @ts-expect-error opera is undefined
    ua = (window.navigator.userAgent || window.navigator.vendor || window.opera || '').toLowerCase()

  return ua
}

const cache: Record<string, unknown> = Object.create(null)

const getCachedValue = <T>(key: string, getterFn: () => T): T => {
  if (cache[key] === undefined)
    cache[key] = getterFn()

  return cache[key] as T
}

const getMicrophoneStatus = async () => arrayHasItems(
  (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === 'audioinput') || []
)

const getPlatformDetails = (userAgent: string): Details => {
  if (!details) {
    const match = /(edg|edge|edga|edgios)\/([\w.]+)/.exec(userAgent)
      || /(opr)[/]([\w.]+)/.exec(userAgent)
      || /(vivaldi)[/]([\w.]+)/.exec(userAgent)
      || /(chrome|crios)[/]([\w.]+)/.exec(userAgent)
      || /(version)(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(userAgent)
      || /(webkit)[/]([\w.]+).*(version)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(userAgent)
      || /(firefox|fxios)[/]([\w.]+)/.exec(userAgent)
      || /(webkit)[/]([\w.]+)/.exec(userAgent)
      || /(opera)(?:.*version|)[/]([\w.]+)/.exec(userAgent)
      || []

    details = {
      browser: match[5] || match[3] || match[1] || '',
      version: match[4] || match[2] || '0',
      platform: getPlatformMatches()[0] || ''
    }
  }

  return details
}

/**
 * @returns {any[]}
 */
const getPlatformMatches = () => {
  const userAgent = ua || ''

  return /(ipad)/.exec(userAgent)
    || /(ipod)/.exec(userAgent)
    || /(windows phone)/.exec(userAgent)
    || /(iphone)/.exec(userAgent)
    || /(kindle)/.exec(userAgent)
    || /(silk)/.exec(userAgent)
    || /(android)/.exec(userAgent)
    || /(win)/.exec(userAgent)
    || /(mac)/.exec(userAgent)
    || /(linux)/.exec(userAgent)
    || /(cros)/.exec(userAgent)
    || []
}

const platform = {
  get details() {
    return getPlatformDetails(platform.ua)
  },
  get ua() {
    return getUa() || ''
  },
  is: {
    get webMobile() {
      return getCachedValue(
        'webmob',
        () => /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|kindle|silk|mobile/i.test(platform.ua || '')
      )
    },
    get webDesktop() {
      return getCachedValue('!webmob', () => !this.webMobile)
    },
    get touchAllowed() {
      return getCachedValue('touch', () => browser && 'ontouchstart' in window)
    },
    get mouseAllowed() {
      return getCachedValue('mouse', () => browser && matchMedia('(pointer:fine)').matches)
    },
    get microphoneAvailable() {
      return getCachedValue('mouse', getMicrophoneStatus)
    }
  }
}

export default platform
