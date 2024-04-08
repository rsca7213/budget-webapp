import { AbstractControl } from '@angular/forms'
import { CustomValidators } from './validations.class'

describe('Validations/ValidatorFns', () => {
  describe('categoryType', () => {
    it('Should return null when the value is correct', () => {
      expect(CustomValidators.categoryType()({ value: 'Income' } as AbstractControl)).toBe(null)
    })
    it('Should return a categoryType error when the value is incorrect', () => {
      expect(CustomValidators.categoryType()({ value: 'Incorrect' } as AbstractControl)).toEqual({
        categoryType: true
      })
    })
  })

  describe('hasNumber', () => {
    it('Should return null when the value is correct', () => {
      expect(CustomValidators.hasNumber()({ value: 'Password123' } as AbstractControl)).toBe(null)
    })
    it('Should return a hasNumber error when the value is incorrect', () => {
      expect(CustomValidators.hasNumber()({ value: 'Password' } as AbstractControl)).toEqual({
        hasNumber: true
      })
    })
  })

  describe('hasUppercase', () => {
    it('Should return null when the value is correct', () => {
      expect(CustomValidators.hasUppercase()({ value: 'Password123' } as AbstractControl)).toBe(
        null
      )
    })
    it('Should return a hasUppercase error when the value is incorrect', () => {
      expect(CustomValidators.hasUppercase()({ value: 'password123' } as AbstractControl)).toEqual({
        hasUppercase: true
      })
    })
  })

  describe('hasLowercase', () => {
    it('Should return null when the value is correct', () => {
      expect(CustomValidators.hasLowercase()({ value: 'Password123' } as AbstractControl)).toBe(
        null
      )
    })
    it('Should return a hasLowercase error when the value is incorrect', () => {
      expect(CustomValidators.hasLowercase()({ value: 'PASSWORD123' } as AbstractControl)).toEqual({
        hasLowercase: true
      })
    })
  })

  describe('hasSpecialCharacter', () => {
    it('Should return null when the value is correct', () => {
      expect(
        CustomValidators.hasSpecialCharacter()({ value: 'Password123!' } as AbstractControl)
      ).toBe(null)
    })
    it('Should return a hasSpecialCharacter error when the value is incorrect', () => {
      expect(
        CustomValidators.hasSpecialCharacter()({ value: 'Password123' } as AbstractControl)
      ).toEqual({
        hasSpecialCharacter: true
      })
    })
  })
})
