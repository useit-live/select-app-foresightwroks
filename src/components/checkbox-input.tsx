import { ICheckboxInputProps } from '@/types'

const CheckboxInput = ({ checked, onChange }: ICheckboxInputProps) => {
  return <input type="checkbox" checked={checked} onChange={onChange} />
}

export default CheckboxInput
