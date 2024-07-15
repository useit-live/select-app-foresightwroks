import { FieldError } from 'react-hook-form'

export interface IOption {
  label: string
  value: number | string
}

export interface ISelectProps {
  name: string
  options: IOption[]
  isMultiple?: boolean
  placeholder?: string
  helperText?: string
}

export interface ICheckboxProps {
  label: string
  value: string | number
  checked: boolean
  onChange: () => void
}

export interface ITextFieldProps {
  label: string
  name: string
  helperText?: FieldError
  type: string
}
