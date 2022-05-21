import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const onSubmit = data => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card w-full lg:max-w-md mx-auto shadow-2xl bg-base-10 mt-14">
            <div class="card-body">
                <h3 className="text-2xl font-semibold mb-1">Sign Up</h3>
                <hr />
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">
                            Name<span className="text-red"> *</span>
                        </span>
                    </label>
                    <input
                        {...register('name', {
                            required: { value: true, message: 'Name is required' }
                        })}
                        type="text"
                        placeholder="Your name"
                        class="input input-bordered"
                    />
                    {errors?.name?.type === 'required' && <p className="text-primary">{errors.name.message}</p>}
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">
                            Email<span className="text-red"> *</span>
                        </span>
                    </label>
                    <input
                        {...register('email', {
                            required: { value: true, message: 'Email is required' },
                            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email!' }
                        })}
                        type="text"
                        placeholder="Email"
                        class="input input-bordered"
                    />
                    {errors?.email?.type === 'required' && <p className="text-primary">{errors.email.message}</p>}
                    {errors?.email?.type === 'pattern' && <p className="text-primary">{errors.email.message}</p>}
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">
                            Password<span className="text-red"> *</span>
                        </span>
                    </label>
                    <input
                        {...register('password', {
                            required: { value: true, message: 'Password is required' },
                            minLength: { value: 6, message: 'Password must be minimum 6 character length' }
                        })}
                        type="text"
                        placeholder="Password"
                        class="input input-bordered"
                    />
                    {errors?.password?.type === 'required' && <p className="text-primary">{errors.password.message}</p>}
                    {errors?.password?.type === 'minLength' && <p className="text-primary">{errors.password.message}</p>}
                    <label class="label">
                        <Link to="/" class="label-text-alt link link-hover">
                            Forgot password?
                        </Link>
                    </label>
                </div>
                <div class="form-control">
                    <button class="btn btn-primary text-white uppercase">Sign Up</button>
                </div>
                <button className="label-text-alt text-left">
                    Already have an account?
                    <Link to="/login" class="hover:underline">
                        <span className="ml-1 text-accent">Login</span>
                    </Link>
                </button>
            </div>
        </form>
    )
}

export default SignUp
