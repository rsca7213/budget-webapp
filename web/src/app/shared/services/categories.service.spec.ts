import { HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { testData } from '../../../test/testing-data'
import { CategoriesService } from './categories.service'
import { TestingModule } from '../../../test/testing.module'

describe('Shared/CategoriesService', () => {
  let service: CategoriesService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [CategoriesService]
    })

    service = TestBed.inject(CategoriesService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('Should create the service', () => {
    expect(service).toBeTruthy()
  })

  it('Should execute the api get all categories request', async () => {
    service.getAll().subscribe(res => expect(res).toEqual([testData.responses.getCategory]))

    const req = httpTestingController.expectOne('/categories')
    expect(req.request.method).toBe('GET')

    req.flush([testData.responses.getCategory])
  })

  it('Should execute the api get category request', async () => {
    service
      .get(testData.responses.getCategory.uuid)
      .subscribe(res => expect(res).toEqual(testData.responses.getCategory))

    const req = httpTestingController.expectOne(
      `/categories/${testData.responses.getCategory.uuid}`
    )
    expect(req.request.method).toBe('GET')

    req.flush(testData.responses.getCategory)
  })

  it('Should execute the api create category request', async () => {
    service
      .create(testData.requests.createCategory)
      .subscribe(res => expect(res).toEqual(testData.responses.getCategory))

    const req = httpTestingController.expectOne('/categories')
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual(testData.requests.createCategory)

    req.flush(testData.responses.getCategory)
  })

  it('Should execute the api update category request', async () => {
    const updatedCategory = {
      ...testData.responses.getCategory,
      ...testData.requests.updateCategory
    }

    service
      .update(testData.responses.getCategory.uuid, testData.requests.updateCategory)
      .subscribe(res => expect(res).toEqual(updatedCategory))

    const req = httpTestingController.expectOne(
      `/categories/${testData.responses.getCategory.uuid}`
    )
    expect(req.request.method).toBe('PUT')
    expect(req.request.body).toEqual(testData.requests.updateCategory)

    req.flush(updatedCategory)
  })

  it('Should execute the api delete category request', async () => {
    const uuid = testData.responses.getCategory.uuid

    service.delete(uuid).subscribe()

    const req = httpTestingController.expectOne(`/categories/${uuid}`)
    expect(req.request.method).toBe('DELETE')

    req.flush(null)
  })
})
