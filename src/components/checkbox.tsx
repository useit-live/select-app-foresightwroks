import { ICheckboxProps } from '@/types'
import CheckboxInput from '@/components/checkbox-input.tsx'

const Checkbox = ({ label, checked, onChange }: ICheckboxProps) => {
  return (
    <div className="flex flex-row space-x-2">
      <CheckboxInput checked={checked} onChange={onChange} />
      <span>{label}</span>
    </div>
  )
}

export default Checkbox
