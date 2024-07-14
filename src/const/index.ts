import * as Yup from 'yup'

export const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 }
]

export const formSchema = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  email: Yup.string()
    .email('Field should contain a valid e-mail')
    .max(255)
    .required('E-mail is required'),
  selectedOptions: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.mixed().required()
      })
    )
    .min(1, 'At least one option must be selected')
    .required('Options are required')
})
