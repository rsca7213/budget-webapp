import { Repository } from 'typeorm'
import { CurrencyService } from '../../src/app/services/currency.service'
import { CurrencyRepository } from '../../src/infrastructure/database/currency.repository'
import { BootstrapServerService } from '../../src/infrastructure/services/bootstrap-server.service'
import { UuidService } from '../../src/infrastructure/services/uuid.service'
import { CurrencyDatabaseEntity } from '../../src/infrastructure/database/models/currency.orm.entity'
import { UserDatabaseEntity } from '../../src/infrastructure/database/models/user.orm.entity'
import { Currency } from '../../src/domain/entities/currency.entity'
import { Exception } from '../../src/domain/exception/exception'

jest.mock('../../src/infrastructure/services/uuid.service.ts')
jest.mock('../../src/infrastructure/database/currency.repository.ts')

let uuidService: UuidService
let currencyService: CurrencyService
let currencyRepository: CurrencyRepository

const userUuid = 'cde4d425-c343-4a3d-bb0e-266f9331f171'
const secondaryUserUuid = 'cde4d425-c343-4a3d-bb0e-266f9331f172'

beforeAll(() => {
  new BootstrapServerService().startDomainValidationService(false)
  uuidService = new UuidService()
  currencyRepository = new CurrencyRepository(
    {} as Repository<CurrencyDatabaseEntity>,
    {} as Repository<UserDatabaseEntity>
  )
  currencyService = new CurrencyService(uuidService, currencyRepository)
})

describe('[Unit - CurrencyService] Find all currencies', () => {
  it('Should find all currencies', async () => {
    const currencies = await currencyService.findAll(userUuid)

    expect(currencies.length).toBe(3)
    expect(
      currencies.map(currency => currency instanceof Currency).every(instance => instance)
    ).toBe(true)
  })
})

describe('[Unit - CurrencyService] Create a currency', () => {
  it('Should create a valid currency', async () => {
    const currencies = await currencyService.create('Peso', 'ARS', 0.012, userUuid)

    expect(currencies.getUuid()).toBe('6d6a9b03-8a3c-4d39-8119-f9cf8a9fd742')
    expect(currencies.getCreatedAt()).toBeInstanceOf(Date)
    expect(currencies.getUpdatedAt()).toBeInstanceOf(Date)
    expect(currencies.getName()).toBe('Peso')
    expect(currencies.getCode()).toBe('ARS')
    expect(currencies.getExchangeRate()).toBe(0.012)
    expect(currencies.getIsDefault()).toBe(false)
    expect(currencies instanceof Currency).toBe(true)
  })

  it('Should create a valid currency and set it as default', async () => {
    const currencies = await currencyService.create('Real', 'BRL', 1, secondaryUserUuid)

    expect(currencies.getUuid()).toBe('6d6a9b03-8a3c-4d39-8119-f9cf8a9fd743')
    expect(currencies.getCreatedAt()).toBeInstanceOf(Date)
    expect(currencies.getUpdatedAt()).toBeInstanceOf(Date)
    expect(currencies.getName()).toBe('Real')
    expect(currencies.getCode()).toBe('BRL')
    expect(currencies.getExchangeRate()).toBe(1)
    expect(currencies.getIsDefault()).toBe(true)
    expect(currencies instanceof Currency).toBe(true)
  })

  it('Should throw an error when currency by code already exists', async () => {
    try {
      await currencyService.create('Peso', 'ARS', 0.012, userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Verification')
      expect(error.origin).toBe('ApplicationService.Currency.create')
      expect(error.message).toBe('Currency by code ARS already exists')
    }
  })

  it('Should throw an error when currency by name already exists', async () => {
    try {
      await currencyService.create('Peso', 'VES', 0.012, userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Verification')
      expect(error.origin).toBe('ApplicationService.Currency.create')
      expect(error.message).toBe('Currency by name Peso already exists')
    }
  })

  it('Should throw an error when name is empty', async () => {
    try {
      await currencyService.create('', 'ARS', 0.012, userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Currency.name')
      expect(error.message).toBe('Name is required')
    }
  })

  it('Should throw an error when name is less than 3 characters', async () => {
    try {
      await currencyService.create('Pe', 'ARS', 0.012, userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Currency.name')
      expect(error.message).toBe('Name must have at least 3 characters')
    }
  })

  it('Should throw an error when name is more than 50 characters', async () => {
    try {
      await currencyService.create(
        'Republic of Argentina National Currency The ARS Peso',
        'ARS',
        0.012,
        userUuid
      )
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Currency.name')
      expect(error.message).toBe('Name must have at most 50 characters')
    }
  })

  it('Should throw an error when code is empty', async () => {
    try {
      await currencyService.create('Peso', '', 0.012, userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Currency.code')
      expect(error.message).toBe('Code is required')
    }
  })

  it('Should throw an error when code is less than 3 characters', async () => {
    try {
      await currencyService.create('Peso', 'AR', 0.012, userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Currency.code')
      expect(error.message).toBe('Code must have at least 3 characters')
    }
  })

  it('Should throw an error when code is more than 3 characters', async () => {
    try {
      await currencyService.create('Peso', 'ARSS', 0.012, userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Currency.code')
      expect(error.message).toBe('Code must have at most 3 characters')
    }
  })

  it('Should throw an error when exchange rate is empty', async () => {
    try {
      await currencyService.create('Peso', 'ARS', null as any, userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Currency.exchangeRate')
      expect(error.message).toBe('Exchange rate is required')
    }
  })

  it('Should throw an error when exchange rate is less than 0', async () => {
    try {
      await currencyService.create('Peso', 'ARS', 0, userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Currency.exchangeRate')
      expect(error.message).toBe('Exchange rate must be greater than 0')
    }
  })
})
