import React from 'react'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FieldPath } from 'react-hook-form'

const FormFieldComp = ({
  form,
  name,
  label,
  placeholder,
  formSchema,
}: {
  form: z.infer<typeof formSchema>
  label: string
  name: FieldPath<z.infer<typeof formSchema>>
  placeholder: string
  formSchema: z.ZodSchema
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className='form-item'>
          <FormLabel className='form-label'>{label}</FormLabel>
          <div className='flex w-full flex-col'>
            <FormControl>
              <Input
                placeholder={placeholder}
                className='input-class'
                type={name === 'password' ? 'password' : 'text'}
                {...field}
              />
            </FormControl>
            <FormMessage className='form-message mt-2' />
          </div>
        </div>
      )}
    />
  )
}

export default FormFieldComp
