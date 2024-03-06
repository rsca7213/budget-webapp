import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Category } from '../models/category.model'
import { GetCategoryDto } from '../dto/categories/get-category.dto'
import { CreateCategoryDto } from '../dto/categories/create-category.dto'
import { UpdateCategoryDto } from '../dto/categories/update-category.dto'

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

  public create(category: CreateCategoryDto): Observable<Category> {
    return this.httpClient.post<GetCategoryDto>('/categories', category)
  }

  public update(uuid: string, category: UpdateCategoryDto): Observable<Category> {
    const data: UpdateCategoryDto = category
    return this.httpClient.put<GetCategoryDto>(`/categories/${uuid}`, data)
  }

  public delete(uuid: string): Observable<void> {
    return this.httpClient.delete<void>(`/categories/${uuid}`)
  }
}
