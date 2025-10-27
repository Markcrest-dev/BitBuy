'use client'

import { useState, useEffect } from 'react'
import { useCurrencyStore } from '@/store/currencyStore'

export default function CurrencySelector() {
  const { currentCurrency, currencies, setCurrency, setCurrencies } = useCurrencyStore()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch currencies from API
    fetch('/api/currencies')
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch currencies:', err)
        setLoading(false)
      })
  }, [setCurrencies])

  const handleCurrencyChange = (currency: typeof currencies[0]) => {
    setCurrency(currency)
    setIsOpen(false)
  }

  if (loading || currencies.length === 0) {
    return (
      <div className="flex items-center gap-1 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-sm">
        <span className="font-medium text-white">{currentCurrency.code}</span>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg hover:bg-white/20 hover:border-white/40 transition-all text-sm font-medium text-white"
      >
        <svg className="w-4 h-4 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{currentCurrency.code}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-20 max-h-80 overflow-y-auto">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Select Currency
              </div>
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencyChange(currency)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                    currentCurrency.code === currency.code
                      ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 font-semibold'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{currency.symbol}</span>
                    <div className="text-left">
                      <div className="font-medium">{currency.code}</div>
                      <div className="text-xs text-gray-500">{currency.name}</div>
                    </div>
                  </div>
                  {currentCurrency.code === currency.code && (
                    <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
