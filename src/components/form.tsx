import React, { useMemo } from 'react'

import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextField from '@/components/text-field.tsx'
import Select from '@/components/select.tsx'
import { formSchema, options } from '@/const'
import { sleep } from '@/lib/utils.ts'

const Form: React.FC = () => {
  const defaultValues = useMemo(
    () => ({
      name: '',
      email: '',
      selectedOptions: []
    }),
    []
  )

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = methods

  const onSubmit = handleSubmit(async data => {
    await sleep(2000)
      .then(() => console.log(data))
      .then(() => reset())
      .catch(e => console.error(e))
  })

  if (isSubmitting) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <div className="mt-16 w-full max-w-xs">
      <FormProvider {...methods}>
        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded bg-white p-6 shadow-md"
        >
          <TextField label="Name" name="name" type="text" />
          <TextField label="Email" name="email" type="email" />
          <Select
            name="selectedOptions"
            options={options}
            isMultiple={true}
            placeholder="Choose options..."
          />
          <div className="flex items-center justify-between">
            <button
              className="rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700"
              type="submit"
              disabled={!isValid}
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default Form
