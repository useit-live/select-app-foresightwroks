import React, { useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { IOption, ISelectProps } from '@/types'
import Checkbox from '@/components/checkbox.tsx'
import { ArrowIcon } from '@/components/ui/icons.tsx'

const Select: React.FC<ISelectProps> = ({
  name,
  options,
  isMultiple = false,
  placeholder
}) => {
  const { control, resetField } = useFormContext()
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const selectedOptions = useWatch({ control, name }) ?? []

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsOpen(!isOpen)
    setFilter('')
  }

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  )

  const handleOptionClick = (
    option: IOption,
    onChange: (arg0: IOption[]) => void
  ) => {
    const isSelected = selectedOptions.some(
      (o: IOption) => o.value === option.value
    )

    if (isMultiple) {
      onChange(
        isSelected
          ? selectedOptions.filter((o: IOption) => o.value !== option.value)
          : [...selectedOptions, option]
      )
    } else {
      onChange([option])
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = [], onChange }, fieldState: { error } }) => {
        const text = value.length !== options.length ? 'Select All' : 'Deselect All'
        return (
          <div className="flex flex-col items-center">
            <button
              className="inline-flex items-center rounded p-2 font-bold hover:bg-zinc-200"
              onClick={toggleDropdown}
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
                  <div className="flex space-x-2 ">
                    <Checkbox
                      label={text}
                      checked={value.length === options.length}
                      onChange={() =>
                        value.length === options.length
                          ? resetField(name)
                          : onChange(options)
                      }
                      value={text}
                    />
                  </div>
                )}

                {filteredOptions.map(option => (
                  <Checkbox
                    key={option.value}
                    label={option.label}
                    checked={value.some(
                      (o: IOption) => o.value === option.value
                    )}
                    onChange={() => handleOptionClick(option, onChange)}
                    value={option.value}
                  />
                ))}
              </div>
            )}
            {error && <p className="text-red-500">{error.message}</p>}
          </div>
        )
      }}
    />
  )
}

export default Select
