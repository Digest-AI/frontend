const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const only_letters_pattern = /^[a-zA-Z]+$/
const only_numbers_pattern = /^\d+$/
const PASSWORD_MIN_LENGTH = 8

const CODE_LENGTH = 6

type ValidatorFn = (value: string) => string

export const validateEmail: ValidatorFn = (value: string) => {
  if (value.trim() === '') {
    // Don't show error for empty field (handled by required attribute)
    return ''
  }
  return email_pattern.test(value) ? '' : 'invalid_email_format'
}

export const validatePassword: ValidatorFn = (value: string) => {
  if (value.trim() === '') {
    return ''
  }
  let error = ''
  if (only_letters_pattern.test(value)) {
    error = 'password_only_letters'
  } else if (only_numbers_pattern.test(value)) {
    error = 'password_only_numbers'
  } else if (value.length < PASSWORD_MIN_LENGTH) {
    error = 'password_too_small'
  }
  return error
}

export const validateCode: ValidatorFn = (value: string) => {
  const sanitized = value.replace(/[^0-9a-zA-Z]/gi, '').toUpperCase().slice(0, CODE_LENGTH)

  let error = ''
  if (sanitized.length < CODE_LENGTH && sanitized.length > 0) {
    error = 'code_too_short'
  }
  
  return error
}