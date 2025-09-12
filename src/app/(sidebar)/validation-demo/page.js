'use client'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export default function ValidationDemo() {
    const [formikResult, setFormikResult] = useState(null)
    const [hookFormResult, setHookFormResult] = useState(null)

    // Formik + Yup validation schema
    const formikSchema = Yup.object({
        name: Yup.string()
            .min(2, 'Name must be at least 2 characters')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        age: Yup.number()
            .min(18, 'Must be at least 18 years old')
            .max(100, 'Must be less than 100 years old')
            .required('Age is required')
    })

    // React Hook Form + Zod validation schema
    const hookFormSchema = z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Invalid email format'),
        age: z.number().min(18, 'Must be at least 18 years old').max(100, 'Must be less than 100 years old')
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(hookFormSchema)
    })

    const onSubmitFormik = (values) => {
        setFormikResult(values)
        console.log('Formik values:', values)
    }

    const onSubmitHookForm = (data) => {
        setHookFormResult(data)
        console.log('Hook Form data:', data)
    }

    return (
        <div className="container mt-4">
            <h1>Validation Demo</h1>
            <p>Formik + Yup vs React Hook Form + Zod</p>

            <div className="row">
                {/* Formik + Yup */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3>Formik + Yup</h3>
                            <Formik
                                initialValues={{ name: '', email: '', age: '' }}
                                validationSchema={formikSchema}
                                onSubmit={onSubmitFormik}
                            >
                                <Form>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <Field name="name" className="form-control" />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <Field name="email" type="email" className="form-control" />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Age</label>
                                        <Field name="age" type="number" className="form-control" />
                                        <ErrorMessage name="age" component="div" className="text-danger" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Submit (Formik)
                                    </button>
                                </Form>
                            </Formik>
                            {formikResult && (
                                <div className="mt-3 p-2 bg-success bg-opacity-10">
                                    <strong>Formik Result:</strong> {JSON.stringify(formikResult)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* React Hook Form + Zod */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3>React Hook Form + Zod</h3>
                            <form onSubmit={handleSubmit(onSubmitHookForm)}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input {...register('name')} className="form-control" />
                                    {errors.name && <div className="text-danger">{errors.name.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input {...register('email')} type="email" className="form-control" />
                                    {errors.email && <div className="text-danger">{errors.email.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Age</label>
                                    <input {...register('age', { valueAsNumber: true })} type="number" className="form-control" />
                                    {errors.age && <div className="text-danger">{errors.age.message}</div>}
                                </div>
                                <button type="submit" className="btn btn-success">
                                    Submit (Hook Form)
                                </button>
                            </form>
                            {hookFormResult && (
                                <div className="mt-3 p-2 bg-success bg-opacity-10">
                                    <strong>Hook Form Result:</strong> {JSON.stringify(hookFormResult)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Code Examples */}
            <div className="mt-4">
                <h4>Validation Code Examples:</h4>
                <div className="row">
                    <div className="col-md-6">
                        <h5>Formik + Yup</h5>
                        <pre className="bg-light p-3">
{`const schema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
})

<Formik
  initialValues={{ name: '', email: '' }}
  validationSchema={schema}
  onSubmit={onSubmit}
>
  <Form>
    <Field name="name" />
    <ErrorMessage name="name" />
  </Form>
</Formik>`}
                        </pre>
                    </div>
                    <div className="col-md-6">
                        <h5>React Hook Form + Zod</h5>
                        <pre className="bg-light p-3">
{`const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format')
})

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
})

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('name')} />
  {errors.name && <div>{errors.name.message}</div>}
</form>`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}
