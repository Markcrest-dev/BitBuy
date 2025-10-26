'use client'

import { useCurrencyStore } from '@/store/currencyStore'

export function useCurrency() {
  const { currentCurrency, formatPrice, convertPrice } = useCurrencyStore()

  return {
    currentCurrency,
    formatPrice,
    convertPrice,
  }
}
