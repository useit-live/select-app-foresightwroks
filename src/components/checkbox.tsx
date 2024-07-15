import { ICheckboxProps } from '@/types'

const Checkbox = ({ value, label, checked, onChange }: ICheckboxProps) => {
  return (
    <div className="flex flex-row space-x-2">
      <input
        id={`option-${value}`}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
      />
      <label htmlFor={`option-${value}`}>{label}</label>
    </div>
  )
}

export default Checkbox
