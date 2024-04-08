import { CreateCategoryRequestDto } from '../app/shared/dto/categories/requests/create-category.dto'
import { GetCategoryResponseDto } from '../app/shared/dto/categories/responses/get-category.dto'
import { CreateCurrencyRequestDto } from '../app/shared/dto/currencies/requests/create-currency.dto'
import { UpdateCurrencyRequestDto } from '../app/shared/dto/currencies/requests/update-currency.dto'
import { GetCurrencyResponseDto } from '../app/shared/dto/currencies/responses/get-currency.dto'
import { CreateUserRequestDto } from '../app/shared/dto/users/requests/create-user.dto'
import { LoginRequestDto } from '../app/shared/dto/users/requests/login.dto'
import { AuthUserResponseDto } from '../app/shared/dto/users/responses/auth-user.dto'
import { Category } from '../app/shared/models/category.model'
import { Currency } from '../app/shared/models/currency.model'

const requests = {
  login: {
    email: 'johndoe@gmail.com',
    password: 'Password123*'
  } as LoginRequestDto,
  createUser: {
    email: 'johndoe@gmail.com',
    password: 'Password123*',
    name: 'John Doe'
  } as CreateUserRequestDto,
  createCategory: {
    name: 'Food',
    type: 'Expense'
  } as CreateCategoryRequestDto,
  updateCategory: {
    name: 'Bonus',
    type: 'Income'
  } as CreateCategoryRequestDto,
  createCurrency: {
    code: 'USD',
    name: 'Dollar',
    exchangeRate: 1
  } as CreateCurrencyRequestDto,
  updateCurrency: {
    code: 'USD',
    name: 'Dollar',
    exchangeRate: 1
  } as UpdateCurrencyRequestDto
}

const responses = {
  getAuthUser: {
    uuid: '60c45555-10cb-400e-b564-2794395b877d',
    name: 'John Doe',
    email: 'johndoe@gmail.com'
  } as AuthUserResponseDto,
  getCategory: {
    uuid: '60c45555-10cb-400e-b564-2794395b877d',
    name: 'Food',
    type: 'Expense',
    createdAt: new Date('2021-06-12T12:00:00.000Z'),
    updatedAt: new Date('2021-06-12T12:00:00.000Z')
  } as GetCategoryResponseDto,
  getCurrency: {
    uuid: '60c45555-10cb-400e-b564-2794395b877d',
    code: 'USD',
    name: 'Dollar',
    exchangeRate: 1,
    isDefault: true,
    createdAt: new Date('2021-06-12T12:00:00.000Z'),
    updatedAt: new Date('2021-06-12T12:00:00.000Z')
  } as GetCurrencyResponseDto
}

const models = {
  categories: [
    {
      uuid: '60c45555-10cb-400e-b564-2794395b877d',
      name: 'Food',
      type: 'Expense',
      createdAt: new Date('2021-06-12T12:00:00.000Z'),
      updatedAt: new Date('2021-06-12T12:00:00.000Z')
    },
    {
      uuid: '715177b4-514f-425b-a1a9-34d4808a3397',
      name: 'Salary',
      type: 'Income',
      createdAt: new Date('2021-06-12T12:00:00.000Z'),
      updatedAt: new Date('2021-06-12T12:00:00.000Z')
    }
  ] as Category[],
  currencies: [
    {
      uuid: '60c45555-10cb-400e-b564-2794395b877d',
      code: 'USD',
      name: 'Dollar',
      exchangeRate: 1,
      isDefault: true,
      createdAt: new Date('2021-06-12T12:00:00.000Z'),
      updatedAt: new Date('2021-06-12T12:00:00.000Z')
    },
    {
      uuid: '715177b4-514f-425b-a1a9-34d4808a3397',
      code: 'EUR',
      name: 'Euro',
      exchangeRate: 0.85,
      isDefault: false,
      createdAt: new Date('2021-06-12T12:00:00.000Z'),
      updatedAt: new Date('2021-06-12T12:00:00.000Z')
    },
    {
      uuid: 'f8c9b9f2-5e1a-4f3b-9c6a-7b4f0b4f2f7b',
      code: 'JPY',
      name: 'Yen',
      exchangeRate: 110,
      isDefault: false,
      createdAt: new Date('2021-06-12T12:00:00.000Z'),
      updatedAt: new Date('2021-06-12T12:00:00.000Z')
    }
  ] as Currency[]
}

export const testData = {
  requests,
  responses,
  models
}
