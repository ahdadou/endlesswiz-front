
export const getMobileDeviceOSType = () => {
  try {
    if (typeof navigator === 'undefined') {
      return null
    }
    const userAgent = navigator.userAgent
    if (/iPad|iPhone|iPod/.test(userAgent) && (typeof window === 'undefined' || !window.MSStream)) {
      return 'ios'
    }
    if (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
      return 'iPadOS'
    }
    if (/android/i.test(userAgent)) {
      return 'android'
    }
    return 'unknown'
  } catch (error) {
    console.error('error checking getMobileDeviceOSType:', { error })
    return 'unknown'
  }
}
