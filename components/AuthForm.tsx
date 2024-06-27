'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
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
import { useForm } from 'react-hook-form'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import FormFieldComp from './FormFieldComp'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'

const formSchema = (type: string) =>
  z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    state:
      type === 'sign-in' ? z.string().optional() : z.string().max(2).min(2),
    postalCode:
      type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    city: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  })

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const loggedInUser = getLoggedInUser()

  const authFormSchema = formSchema(type)

  // 1. Define your form.
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
    setIsLoading(true)

    try {
      if (type === 'sign-up') {
        const newUser = await signUp(data)
        setUser(newUser)
      }

      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        })
        if (response) router.push('/')
      }
    } catch (error) {
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='cursor-pointer flex items-center gap-1'>
          <Image src='/icons/logo.svg' width={34} height={34} alt='logo' />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
            Horizon
          </h1>
        </Link>

        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}

            <p className='text-16 font-normal text-gray-600'>
              {user
                ? 'Link your account to get started'
                : 'Please enter your details'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {type === 'sign-up' && (
                <>
                  <div className='flex gap-4'>
                    <FormFieldComp
                      formSchema={authFormSchema}
                      form={form}
                      name='firstName'
                      label='First Name'
                      placeholder='ex: John'
                    />

                    <FormFieldComp
                      formSchema={authFormSchema}
                      form={form}
                      name='lastName'
                      label='Last Name'
                      placeholder='ex: Doe'
                    />
                  </div>

                  <FormFieldComp
                    formSchema={authFormSchema}
                    form={form}
                    name='address1'
                    label='Address'
                    placeholder='Enter your specific address'
                  />

                  <FormFieldComp
                    formSchema={authFormSchema}
                    form={form}
                    name='city'
                    label='City'
                    placeholder='Enter your city'
                  />

                  <div className='flex gap-4'>
                    <FormFieldComp
                      formSchema={authFormSchema}
                      form={form}
                      name='state'
                      label='State'
                      placeholder='ex: NY'
                    />

                    <FormFieldComp
                      formSchema={authFormSchema}
                      form={form}
                      name='postalCode'
                      label='Postal Code'
                      placeholder='ex: 10001'
                    />
                  </div>

                  <div className='flex gap-4'>
                    <FormFieldComp
                      formSchema={authFormSchema}
                      form={form}
                      name='dateOfBirth'
                      label='Date of Birth'
                      placeholder='YYYY-MM-DD'
                    />

                    <FormFieldComp
                      formSchema={authFormSchema}
                      form={form}
                      name='ssn'
                      label='SSN'
                      placeholder='ex: 1234'
                    />
                  </div>
                </>
              )}
              <FormFieldComp
                formSchema={authFormSchema}
                form={form}
                name='email'
                label='Email'
                placeholder='Enter your email'
              />

              <FormFieldComp
                formSchema={authFormSchema}
                form={form}
                name='password'
                label='Password'
                placeholder='Enter your password'
              />
              <div className='flex flex-col gap-4'>
                <Button type='submit' className='form-btn' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className='animate-spin' />
                      &nbsp; Loading...
                    </>
                  ) : type === 'sign-in' ? (
                    'Sign In'
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className='flex justify-center gap-1'>
            <p className='text-14 font-normal text-gray-600'>
              {type === 'sign-in'
                ? "Don't have an account?"
                : 'Alredy have an account'}
            </p>
            <Link
              href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
              className='form-link'
            >
              {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm
