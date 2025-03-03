import { getMobileDeviceOSType } from "./getMobileDeviceOSType";

export const checkIfDesktopDevice = () => {
  const deviceType = getMobileDeviceOSType();
  if (deviceType !== "unknown" && navigator.maxTouchPoints < 2) {
    // this is in simulator, because real mobile device has more than 1 touch points
    return true;
  }
  return deviceType === "unknown";
};
