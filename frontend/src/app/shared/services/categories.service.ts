import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Category } from '../models/category.model'
import { GetCategoryDto } from '../dto/get-category.dto'
import { CreateCategoryDto } from '../dto/create-category.dto'
import { UpdateCategoryDto } from '../dto/update-category.dto'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public constructor(private readonly httpClient: HttpClient) {}

  public getAll(): Observable<Category[]> {
    return this.httpClient.get<GetCategoryDto[]>('/categories')
  }

  public get(uuid: string): Observable<Category> {
    return this.httpClient.get<GetCategoryDto>(`/categories/${uuid}`)
  }

  public create(category: Category): Observable<void> {
    const data: CreateCategoryDto = category
    return this.httpClient.post<void>('/categories', data)
  }

  public update(uuid: string, category: Category): Observable<void> {
    const data: UpdateCategoryDto = category
    return this.httpClient.put<void>(`/categories/${uuid}`, data)
  }

  public delete(uuid: string): Observable<void> {
    return this.httpClient.delete<void>(`/categories/${uuid}`)
  }
}
