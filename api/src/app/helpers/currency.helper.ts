import { Currency } from '../../domain/entities/currency.entity'
import { ExchangeRate } from '../../domain/types/exchange-rate.types'

export class CurrencyHelper {
  public static calculateSwappedExchangeRates(
    oldDefault: Currency,
    newDefault: Currency,
    otherCurrencies: Currency[]
  ): ExchangeRate[] {
    const exchangeRates: ExchangeRate[] = []

    const newVsOldDefaultRate = 1 / newDefault.getExchangeRate()

    exchangeRates.push({
      defaultCode: newDefault.getCode(),
      code: oldDefault.getCode(),
      rate: newVsOldDefaultRate
    })

    otherCurrencies.forEach(currency => {
      const rate = currency.getExchangeRate() * newVsOldDefaultRate

      exchangeRates.push({
        defaultCode: newDefault.getCode(),
        code: currency.getCode(),
        rate
      })
    })

    for (const exchangeRate of exchangeRates) {
      if (exchangeRate.rate > 1) exchangeRate.rate = Number(exchangeRate.rate.toFixed(2))
      else exchangeRate.rate = Number(exchangeRate.rate.toFixed(6))
    }

    return exchangeRates
  }
}
