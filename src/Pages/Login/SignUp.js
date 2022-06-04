import React from 'react'
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import googleLogo from '../../assets/icons/google.png'
import auth from '../../Firebase/firebase.init'
import useToken from '../../hooks/useToken'
import LoadingSpinner from '../Shared/LoadingSpinner'
import SetTitle from '../Shared/SetTitle'

const SignUp = () => {
    const [createUserWithEmailAndPassword, eUser, eLoading, eErr] = useCreateUserWithEmailAndPassword(auth, {
        sendEmailVerification: true
    })
    const [updateProfile, updating, upErr] = useUpdateProfile(auth)
    const [signInWithGoogle, gUser, gLoading, gErr] = useSignInWithGoogle(auth)
    const [token] = useToken(eUser || gUser)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()
    const navigate = useNavigate()

    let errorMessage
    if (eErr || gErr || upErr) {
        errorMessage = <p className="text-primary">{eErr?.message || gErr?.message}</p>
    }

    if (token) {
        navigate('/')
    }

    if (eLoading || gLoading || updating) {
        return <LoadingSpinner />
    }

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: data.name })
        reset()
    }

    return (
        <div className="px-5">
            <div className="card card-body max-w-sm lg:max-w-md mx-auto shadow mt-14 mb-20 border-2 border-[#21252c]">
                <SetTitle title={'Sign Up'} />
                <form onSubmit={handleSubmit(onSubmit)} className="text-black">
                    <h3 className="text-2xl font-semibold mb-1 text-white">Sign Up</h3>
                    <hr />
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">
                                Name<span className="text-red"> *</span>
                            </span>
                        </label>
                        <input
                            {...register('name', {
                                required: { value: true, message: 'Name is required' }
                            })}
                            type="text"
                            placeholder="Your name"
                            className="input input-bordered"
                        />
                        {errors?.name?.type === 'required' && <p className="text-primary">{errors.name.message}</p>}
                    </div>
                    <div className="form-control">
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
                    </div>
                    {errorMessage}
                    <div className="form-control mt-4">
                        <button className="btn btn-primary text-white uppercase">Sign Up</button>
                    </div>
                    <button className="label-text-alt text-left text-white">
                        Already have an account?
                        <Link to="/login" className="hover:underline">
                            <span className="ml-1 text-accent">Login</span>
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

export default SignUp
