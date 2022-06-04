import React from 'react'
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import googleLogo from '../../assets/icons/google.png'
import auth from '../../Firebase/firebase.init'
import useToken from '../../hooks/useToken'
import LoadingSpinner from '../Shared/LoadingSpinner'
import SetTitle from '../Shared/SetTitle'

const Login = () => {
    const [signInWithEmailAndPassword, eUser, eLoading, eErr] = useSignInWithEmailAndPassword(auth)
    const [signInWithGoogle, gUser, gLoading, gErr] = useSignInWithGoogle(auth)
    const [token] = useToken(eUser || gUser)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()
    const navigate = useNavigate()
    const location = useLocation()

    const from = location?.state?.from.pathname || '/'

    let errorMessage
    if (eErr || gErr) {
        errorMessage = <p className="text-primary">{eErr.message}</p>
    }

    if (token) {
        navigate(from, { replace: true })
    }

    if (eLoading || gLoading) {
        return <LoadingSpinner />
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
        reset()
    }

    return (
        <div className="px-5">
            <div className="card card-body max-w-sm lg:max-w-md mx-auto shadow mt-14 mb-20 border-2 border-[#21252c]">
                <SetTitle title="Login" />
                <form onSubmit={handleSubmit(onSubmit)} className="text-black">
                    <h3 className="text-2xl font-semibold mb-1 text-white">Login</h3>
                    <hr />
                    <div className="form-control mt-2">
                        <label className="label">
                            <span className="label-text text-white">
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
                            className="input input-bordered"
                        />
                        {errors?.email?.type === 'required' && <p className="text-primary">{errors.email.message}</p>}
                        {errors?.email?.type === 'pattern' && <p className="text-primary">{errors.email.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">
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
                            className="input input-bordered"
                        />
                        {errors?.password?.type === 'required' && (
                            <p className="text-primary">{errors.password.message}</p>
                        )}
                        {errors?.password?.type === 'minLength' && (
                            <p className="text-primary">{errors.password.message}</p>
                        )}
                        <label className="label">
                            <Link to="/" className="label-text-alt link link-hover text-white">
                                Forgot password?
                            </Link>
                        </label>
                    </div>
                    {errorMessage}
                    <div className="form-control">
                        <button className="btn btn-primary text-white uppercase">Login</button>
                    </div>
                    <button className="label-text-alt text-left text-white">
                        Fresh user?
                        <Link to="/signup" className="hover:underline">
                            <span className="ml-1 text-accent">Create an account</span>
                        </Link>
                    </button>
                </form>
                <div class="divider">OR</div>
                <div className="form-control">
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-ghost btn-outline btn-info justify-evenly"
                    >
                        <img className="h-8" src={googleLogo} alt="Google Sign in" /> Continue with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
