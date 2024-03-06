import { Repository } from 'typeorm'
import { CurrencyService } from '../../src/app/services/currency.service'
import { CurrencyRepository } from '../../src/infrastructure/database/currency.repository'
import { BootstrapServerService } from '../../src/infrastructure/services/bootstrap-server.service'
import { UuidService } from '../../src/infrastructure/services/uuid.service'
import { CurrencyDatabaseEntity } from '../../src/infrastructure/database/models/currency.orm.entity'
import { UserDatabaseEntity } from '../../src/infrastructure/database/models/user.orm.entity'
import { Currency } from '../../src/domain/entities/currency.entity'

jest.mock('../../src/infrastructure/services/uuid.service.ts')
jest.mock('../../src/infrastructure/database/currency.repository.ts')

let uuidService: UuidService
let currencyService: CurrencyService
let currencyRepository: CurrencyRepository

const userUuid = 'cde4d425-c343-4a3d-bb0e-266f9331f171'

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
