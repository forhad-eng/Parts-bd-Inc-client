import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'
import LoadingSpinner from '../Shared/LoadingSpinner'

const ManageProducts = () => {
    const [reqToDeleteProduct, setReqToDeleteProduct] = useState(null)

    const getUsers = async () => {
        const { data } = await axiosPrivate.get('http://localhost:5000/parts')
        return data.data
    }
    const { data, isLoading, refetch } = useQuery('all-parts', getUsers)

    if (isLoading) {
        return <LoadingSpinner />
    }

    const deleteProductHandle = async _id => {
        const { data } = await axiosPrivate.delete(`http://localhost:5000/parts/${_id}`)
        if (data.success) {
            refetch()
            toast.success(data.message)
        }
    }

    return (
        <div>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Available</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr>
                                <th>{index + 1}</th>
                                <td>
                                    <div class="avatar">
                                        <div class="w-14 mask mask-squircle">
                                            <img src={item.image} alt="product-pic" />
                                        </div>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.available}</td>
                                <td>
                                    <label
                                        onClick={() => setReqToDeleteProduct(item)}
                                        for="admin-delete-product"
                                        class="btn btn-xs"
                                    >
                                        Delete
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {reqToDeleteProduct && (
                <CancelOrder reqToDeleteProduct={reqToDeleteProduct} deleteProductHandle={deleteProductHandle} />
            )}
        </div>
    )
}

const CancelOrder = ({ reqToDeleteProduct, deleteProductHandle }) => {
    const { name, _id } = reqToDeleteProduct

    return (
        <div>
            <input type="checkbox" id="admin-delete-product" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label for="admin-delete-product" class="btn btn-sm btn-circle absolute right-2 top-2">
                        ✕
                    </label>
                    <h3 class="font-bold text-lg">Are you sure?</h3>
                    <p class="py-4">
                        You want to delete <span className="font-bold">{name}</span> order?
                    </p>
                    <div class="modal-action">
                        <label onClick={() => deleteProductHandle(_id)} for="admin-delete-product" class="btn">
                            Yes
                        </label>
                        <label for="admin-delete-product" class="btn">
                            No
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageProducts