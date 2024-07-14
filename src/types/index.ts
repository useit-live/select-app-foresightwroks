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

export interface ICheckboxInputProps {
  checked: boolean
  onChange: () => void
}

export interface ICheckboxProps extends ICheckboxInputProps {
  label: string
}

export interface ITextFieldProps {
  label: string
  name: string
  helperText?: FieldError
  type: string
}
