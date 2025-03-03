import { isInternalServerSideInvocation } from './environmentUtils'
import { getBaseUrl } from './getBaseUrl'

export const getSlcApiBaseUrl = () => {
  if (isInternalServerSideInvocation()) {
    return process.env.SOCIAL_LIVE_COMMERCE_SERVICE_INTERNAL_URL
  } else {
    return `${getBaseUrl()}${process.env.socialLiveCommerceServicePath}`
  }
}

export const getConnectServiceApiBaseUrl = () => {
  if (isInternalServerSideInvocation()) {
    return process.env.CONNECT_SERVICE_INTERNAL_URL
  } else {
    return `${getBaseUrl()}${process.env.connectServicePath}`
  }
}

export const getProductDispenserServiceApiBaseUrl = () => {
  if (isInternalServerSideInvocation()) {
    return process.env.PRODUCT_DISPENSER_SERVICE_INTERNAL_URL
  } else {
    return `${getBaseUrl()}${process.env.productDispenserServicePath}`
  }
}

export const getPdpViewUrl = (sku: string, params?: URLSearchParams) => {
  const queryString = params ? `?${params.toString()}` : ''
  return `${getBaseUrl()}/${process.env.pdpViewPath}/product/${sku}${queryString}`
}
