import React from 'react' // Ensure this is imported
import { render, fireEvent, screen } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import Select from '@/components/select.tsx'
import { IOption } from '@/types'

const options: IOption[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 }
]

type Props = {
  children: React.ReactNode
}

const renderWithForm = (component: React.ReactElement) => {
  const Wrapper = ({ children }: Props) => {
    const methods = useForm()
    return <FormProvider {...methods}>{children}</FormProvider>
  }
  return render(component, { wrapper: Wrapper })
}

describe('Select Component', () => {
  test('renders select component with placeholder', () => {
    renderWithForm(
      <Select
        name="selectedOptions"
        options={options}
        placeholder="Select an option"
      />
    )
    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  test('opens dropdown on button click', () => {
    renderWithForm(
      <Select
        name="selectedOptions"
        options={options}
        placeholder="Select an option"
      />
    )
    fireEvent.click(screen.getByText('Select an option'))
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  test('filters options based on search input', () => {
    renderWithForm(
      <Select
        name="selectedOptions"
        options={options}
        placeholder="Select an option"
      />
    )
    fireEvent.click(screen.getByText('Select an option'))
    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'Option 1' }
    })
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument()
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument()
  })

  test('selects and deselects options in multiple mode', () => {
    renderWithForm(
      <Select
        name="selectedOptions"
        options={options}
        placeholder="Select options"
        isMultiple
      />
    )
    fireEvent.click(screen.getByText('Select options'))
    fireEvent.click(screen.getByLabelText('Option 1'))
    fireEvent.click(screen.getByLabelText('Option 2'))
    expect(screen.getByLabelText('Option 1')).toBeChecked()
    expect(screen.getByLabelText('Option 2')).toBeChecked()
    fireEvent.click(screen.getByLabelText('Option 1'))
    expect(screen.getByLabelText('Option 1')).not.toBeChecked()
  })

  test('selects and deselects all options in multiple mode', () => {
    renderWithForm(
      <Select
        name="selectedOptions"
        options={options}
        placeholder="Select options"
        isMultiple
      />
    )
    fireEvent.click(screen.getByText('Select options'))
    fireEvent.click(screen.getByLabelText('Select All'))
    options.forEach(option => {
      expect(screen.getByLabelText(option.label)).toBeChecked()
    })
    fireEvent.click(screen.getByLabelText('Deselect All'))
    options.forEach(option => {
      expect(screen.getByLabelText(option.label)).not.toBeChecked()
    })
  })
})
