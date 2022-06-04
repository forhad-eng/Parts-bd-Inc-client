import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'
import SetTitle from '../Shared/SetTitle'

const AddProduct = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const imageUploadSecret = 'd800159038f19c6082b61b82f9683f6c'

    const onSubmit = async data => {
        const image = data.image[0]
        const formData = new FormData()
        formData.append('image', image)

        const { data: result } = await axios.post(`https://api.imgbb.com/1/upload?key=${imageUploadSecret}`, formData)

        if (result.success) {
            const imageUrl = result.data.url
            const newProduct = {
                ...data,
                image: imageUrl
            }
            const { data: updatedData } = await axiosPrivate.post(
                'https://secure-fjord-36331.herokuapp.com/parts',
                newProduct
            )
            if (updatedData.success) {
                reset()
                toast.success(updatedData.message, { toastId: 'product-add-success' })
            }
        }
    }
    return (
        <div>
            <SetTitle title={'Add Product'} />
            <h3 className="text-2xl font-bold pt-4 pl-10 mb-2">Add Product</h3>
            <hr className="border-[#21252c] h-[1px] mb-6" />
            <div className="w-full lg:max-w-xl shadow rounded-xl border-2 border-[#21252c] m-6">
                <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-10 text-black">
                    <div className="grid lg:grid-cols-2 gap-x-10">
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
                                placeholder="Product name"
                                className="input input-bordered"
                            />
                            {errors?.name?.type === 'required' && <p className="text-primary">{errors.name.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">
                                    Image<span className="text-red"> *</span>
                                </span>
                            </label>
                            <input
                                {...register('image', {
                                    required: { value: true, message: 'Image is required' }
                                })}
                                type="file"
                                className="input input-bordered"
                            />
                            {errors?.image?.type === 'required' && (
                                <p className="text-primary">{errors.image.message}</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">
                                    Price<span className="text-red"> *</span>
                                </span>
                            </label>
                            <input
                                {...register('price', {
                                    required: { value: true, message: 'Price is required' }
                                })}
                                type="number"
                                placeholder="Price"
                                className="input input-bordered"
                            />
                            {errors?.price?.type === 'required' && (
                                <p className="text-primary">{errors.price.message}</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">
                                    Minimum order<span className="text-red"> *</span>
                                </span>
                            </label>
                            <input
                                {...register('minOrder', {
                                    required: { value: true, message: 'Minimum order quantity is required' }
                                })}
                                type="number"
                                placeholder="Minimum Order"
                                className="input input-bordered"
                            />
                            {errors?.minOrder?.type === 'required' && (
                                <p className="text-primary">{errors.minOrder.message}</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">
                                    Available quantity<span className="text-red"> *</span>
                                </span>
                            </label>
                            <input
                                {...register('available', {
                                    required: { value: true, message: 'Available quantity is required' }
                                })}
                                type="number"
                                placeholder="Available"
                                className="input input-bordered"
                            />
                            {errors?.available?.type === 'required' && (
                                <p className="text-primary">{errors.available.message}</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">
                                    Description<span className="text-red"> *</span>
                                </span>
                            </label>
                            <input
                                {...register('description', {
                                    required: { value: true, message: 'Description is required' }
                                })}
                                type="text"
                                placeholder="Description"
                                className="input input-bordered"
                            />
                            {errors?.description?.type === 'required' && (
                                <p className="text-primary">{errors.description.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="form-control mt-4">
                        <button className="btn btn-primary text-white uppercase">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
