import React, { useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { IOption, ISelectProps } from '@/types'
import Checkbox from '@/components/checkbox.tsx'
import { ArrowIcon } from '@/components/ui/icons.tsx'

const Select: React.FC<ISelectProps> = ({
  name,
  options,
  isMultiple = false,
  placeholder,
  helperText
}) => {
  const { control } = useFormContext()
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const selectedOptions = useWatch({ control, name: 'selectedOptions' }) ?? []

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsOpen(!isOpen)
    setFilter('')
  }

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = [], onChange }, fieldState: { error } }) => {
        const handleOptionClick = (option: IOption) => {
          if (selectedOptions.find((o: IOption) => o.value === option.value)) {
            onChange(
              selectedOptions.filter((o: IOption) => o.value !== option.value)
            )
          } else {
            onChange([...selectedOptions, option])
          }
        }

        const handleSelectAll = () => {
          if (value?.length === options.length) {
            onChange([])
          } else {
            onChange(options)
          }
        }

        return (
          <div className="flex flex-col items-center">
            <button
              className="inline-flex items-center rounded p-2 font-bold hover:bg-zinc-200"
              onClick={e => toggleDropdown(e)}
            >
              {placeholder}
              <ArrowIcon />
            </button>
            {isOpen && (
              <div className="my-2 flex w-full flex-col space-y-2">
                <input
                  className="w-full rounded-xl border px-3 py-2"
                  type="text"
                  placeholder="Search..."
                  onChange={e => setFilter(e.target.value)}
                  value={filter}
                />
                {isMultiple && (
                  <div className="flex space-x-2">
                    <Checkbox
                      label={
                        value?.length !== options.length
                          ? 'Select All'
                          : 'Deselect All'
                      }
                      checked={value?.length === options.length}
                      onChange={handleSelectAll}
                      value={
                        value?.length !== options.length
                          ? 'Select All'
                          : 'Deselect All'
                      }
                    />
                  </div>
                )}
                <ul>
                  {filteredOptions.map(option => (
                    <li key={option.value}>
                      <Checkbox
                        key={option.value}
                        label={option.label}
                        checked={value?.some(
                          (o: IOption) => o.value === option.value
                        )}
                        onChange={() => handleOptionClick(option)}
                        value={option.value}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {helperText && <p>{helperText}</p>}
            {error && <p>{error.message}</p>}
          </div>
        )
      }}
    />
  )
}

export default Select
