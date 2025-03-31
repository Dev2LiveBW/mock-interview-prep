'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import FormField from './FormField'
import { useRouter } from 'next/navigation'

const authFormSchema = ({ type }: { type: FormType }) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  })
}

// Define the FormType type to include 'signin' and other possible values
type FormType = 'sign-in' | 'sign-up'
const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter()
  const formSchema = authFormSchema({ type })

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-in') {
        // ✅ This will be type-safe and validated.
        toast.success('Signed in successfully!')
        router.push('/')
        return
      } else {
        // ✅ This will be type-safe and validated.
        toast.success('Account created successfully! Please sign in.')
        router.push('/sign-in')
        return
      }
      // ✅ This will be type-safe and validated.
    } catch (error) {
      console.log(error)
      toast.error(`There was an error: ${error}`)
    }
  }

  const isSignIn = type === 'sign-in'

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">InterPrep </h2>
        </div>
        <h3>Practice Job Interviews With AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Username"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your Email Address"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type={'password'}
            />
            <Button className="btn" type="submit">
              {!isSignIn ? 'Create an Account' : 'Sign In'}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {!isSignIn ? 'Already have an account?' : "Don't have an account?"}
          <Link
            href={!isSignIn ? '/sign-in' : '/sign-up'}
            className="text-user-primary font-extrabold ml-1"
          >
            {!isSignIn ? ' Sign In' : ' Sign Up'}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
