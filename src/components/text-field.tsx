import { Controller, useFormContext } from 'react-hook-form'
import { ITextFieldProps } from '@/types'

export default function TextField({
  label,
  name,
  type,
  ...other
}: ITextFieldProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-gray-700" htmlFor={label}>
              {label}
            </label>
            <input
              {...field}
              className="w-full rounded-xl border px-3 py-2"
              id={label}
              type={type}
              value={field.value}
              onChange={event => field.onChange(event.target.value)}
              {...other}
            />
            {error && <span>{error.message}</span>}
          </div>
        )
      }}
    />
  )
}
