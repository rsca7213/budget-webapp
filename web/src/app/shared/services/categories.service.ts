import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Category } from '../models/category.model'
import { GetCategoryResponseDto } from '../dto/categories/responses/get-category.dto'
import { CreateCategoryRequestDto } from '../dto/categories/requests/create-category.dto'
import { UpdateCategoryRequestDto } from '../dto/categories/requests/update-category.dto'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public constructor(private readonly httpClient: HttpClient) {}

  public getAll(): Observable<Category[]> {
    return this.httpClient.get<GetCategoryResponseDto[]>('/categories')
  }

  public get(uuid: string): Observable<Category> {
    return this.httpClient.get<GetCategoryResponseDto>(`/categories/${uuid}`)
  }

  public create(category: CreateCategoryRequestDto): Observable<Category> {
    return this.httpClient.post<GetCategoryResponseDto>('/categories', category)
  }

  public update(uuid: string, data: UpdateCategoryRequestDto): Observable<Category> {
    return this.httpClient.put<GetCategoryResponseDto>(`/categories/${uuid}`, data)
  }

  public delete(uuid: string): Observable<void> {
    return this.httpClient.delete<void>(`/categories/${uuid}`)
  }
}
