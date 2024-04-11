import { TestBed } from '@angular/core/testing'
import { AccountGroupsService } from './account-groups.service'
import { HttpTestingController } from '@angular/common/http/testing'
import { TestingModule } from '../../../test/testing.module'
import { testData } from '../../../test/testing-data'

describe('Shared/AccountGroupsService', () => {
  let service: AccountGroupsService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [AccountGroupsService]
    })

    service = TestBed.inject(AccountGroupsService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('Should create the service', () => {
    expect(service).toBeTruthy()
  })

  it('Should execute the api get all account groups request', async () => {
    service.getAll().subscribe(res => expect(res).toEqual([testData.responses.getAccountGroup]))

    const req = httpTestingController.expectOne('/account-groups')
    expect(req.request.method).toBe('GET')

    req.flush([testData.responses.getAccountGroup])
  })

  it('Should execute the api create category request', async () => {
    service
      .create(testData.requests.createAccountGroup)
      .subscribe(res => expect(res).toEqual(testData.responses.getAccountGroup))

    const req = httpTestingController.expectOne('/account-groups')
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual(testData.requests.createAccountGroup)

    req.flush(testData.responses.getAccountGroup)
  })
})
