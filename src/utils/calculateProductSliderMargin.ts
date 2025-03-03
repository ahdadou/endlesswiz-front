type _CalculateProductSliderMarginProps = {
  sliderWidth: number
  productTileWidth: number
  sliderGapSize: number
}

const calculateProductSliderMargin = ({
  sliderWidth,
  productTileWidth,
  sliderGapSize,
}: _CalculateProductSliderMarginProps) => {
  const nbrProductTileFitScreen = Math.floor(sliderWidth / (productTileWidth + sliderGapSize))
  return sliderWidth - nbrProductTileFitScreen * productTileWidth - (nbrProductTileFitScreen - 1) * sliderGapSize
}

export default calculateProductSliderMargin
