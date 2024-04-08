import { TestBed } from '@angular/core/testing'
import { CurrenciesService } from './currencies.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { testData } from '../../../test/testing-data'
import { ExchangeRate } from '../types/exchange-rate.interface'

describe('Services/Currencies1Service', () => {
  let service: CurrenciesService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrenciesService]
    })

    service = TestBed.inject(CurrenciesService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('Should create the service', () => {
    expect(service).toBeTruthy()
  })

  it('Should execute the api get all currencies request', async () => {
    service.getAll().subscribe(res => expect(res).toEqual([testData.responses.getCurrency]))

    const req = httpTestingController.expectOne('/currencies')
    expect(req.request.method).toBe('GET')

    req.flush([testData.responses.getCurrency])
  })

  it('Should execute the api create currency request', async () => {
    service
      .create(testData.requests.createCurrency)
      .subscribe(res => expect(res).toEqual(testData.responses.getCurrency))

    const req = httpTestingController.expectOne('/currencies')
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual(testData.requests.createCurrency)

    req.flush(testData.responses.getCurrency)
  })

  it('Should execute the api update currency request', async () => {
    service
      .update(testData.requests.updateCurrency, testData.responses.getCurrency.uuid)
      .subscribe(res => expect(res).toEqual(testData.responses.getCurrency))

    const req = httpTestingController.expectOne(
      `/currencies/${testData.responses.getCurrency.uuid}`
    )
    expect(req.request.method).toBe('PUT')
    expect(req.request.body).toEqual(testData.requests.updateCurrency)

    req.flush(testData.responses.getCurrency)
  })

  it('Should execute the api delete currency request', async () => {
    service.delete(testData.responses.getCurrency.uuid).subscribe()

    const req = httpTestingController.expectOne(
      `/currencies/${testData.responses.getCurrency.uuid}`
    )
    expect(req.request.method).toBe('DELETE')

    req.flush(null)
  })

  it('Should execute the api swap default currency request', async () => {
    service.swapDefault(testData.responses.getCurrency.uuid).subscribe(res => {
      expect(res).toEqual([testData.responses.getCurrency])
    })

    const req = httpTestingController.expectOne(
      `/currencies/swap-default/${testData.responses.getCurrency.uuid}`
    )
    expect(req.request.method).toBe('PATCH')

    req.flush([testData.responses.getCurrency])
  })

  it('Should calculate swapped exchange rates correctly', () => {
    const USD = testData.models.currencies[0]
    const EUR = testData.models.currencies[1]
    const JPY = testData.models.currencies[2]

    const exchangeRates = service.calculateSwappedExchangeRates(USD, EUR, [JPY])

    expect(exchangeRates).toEqual([
      {
        defaultCode: EUR.code,
        code: USD.code,
        rate: 1 / EUR.exchangeRate
      },
      {
        defaultCode: EUR.code,
        code: JPY.code,
        rate: JPY.exchangeRate * (1 / EUR.exchangeRate)
      }
    ] as ExchangeRate[])
  })
})
