import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AccountGroup } from '../models/account-group.model'
import { Observable } from 'rxjs'
import { GetAccountGroupResponseDto } from '../dto/account-groups/responses/get-account-groups.dto'
import { CreateAccountGroupRequestDto } from '../dto/account-groups/requests/create-account-group.dto'

@Injectable({
  providedIn: 'root'
})
export class AccountGroupsService {
  public constructor(private readonly httpClient: HttpClient) {}

  public getAll(): Observable<AccountGroup[]> {
    return this.httpClient.get<GetAccountGroupResponseDto[]>('/account-groups')
  }

  public create(data: CreateAccountGroupRequestDto): Observable<AccountGroup> {
    return this.httpClient.post<GetAccountGroupResponseDto>('/account-groups', data)
  }
}
