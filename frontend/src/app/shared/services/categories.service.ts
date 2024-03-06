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

  public create(category: CreateCategoryDto): Observable<GetCategoryDto> {
    return this.httpClient.post<GetCategoryDto>('/categories', category)
  }

  public update(uuid: string, category: UpdateCategoryDto): Observable<GetCategoryDto> {
    const data: UpdateCategoryDto = category
    return this.httpClient.put<GetCategoryDto>(`/categories/${uuid}`, data)
  }

  public delete(uuid: string): Observable<void> {
    return this.httpClient.delete<void>(`/categories/${uuid}`)
  }
}
