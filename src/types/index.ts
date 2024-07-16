import { ChangeEventHandler } from 'react'

export interface IOption {
  label: string
  value: number | string
}

export interface ISelectProps {
  name: string
  options: IOption[]
  isMultiple?: boolean
  placeholder: string
}

export interface ICheckboxProps {
  label: string
  value: string | number
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement> | undefined
}

export interface ITextFieldProps {
  label: string
  name: string
  type: string
}
