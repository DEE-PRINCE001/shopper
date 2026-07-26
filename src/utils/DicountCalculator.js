
export function CalculateDiscount(percentage, originalPrice) {
    const discountedPrice = originalPrice - ((percentage/100) * originalPrice);
    
    return discountedPrice;
    
}