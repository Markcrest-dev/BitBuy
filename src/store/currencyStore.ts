import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Currency {
  code: string
  name: string
  symbol: string
  rate: number
}

interface CurrencyStore {
  currentCurrency: Currency
  currencies: Currency[]
  setCurrency: (currency: Currency) => void
  setCurrencies: (currencies: Currency[]) => void
  convertPrice: (price: number) => number
  formatPrice: (price: number) => string
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currentCurrency: {
        code: 'USD',
        name: 'US Dollar',
        symbol: '$',
        rate: 1.0,
      },
      currencies: [],
      setCurrency: (currency) => set({ currentCurrency: currency }),
      setCurrencies: (currencies) => set({ currencies }),
      convertPrice: (price) => {
        const { currentCurrency } = get()
        return price * currentCurrency.rate
      },
      formatPrice: (price) => {
        const { currentCurrency } = get()
        const convertedPrice = price * currentCurrency.rate
        return `${currentCurrency.symbol}${convertedPrice.toFixed(2)}`
      },
    }),
    {
      name: 'currency-storage',
    }
  )
)
