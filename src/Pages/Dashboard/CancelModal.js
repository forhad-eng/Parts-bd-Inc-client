import React from 'react'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'

const CancelModal = ({ order, refetch }) => {
    const { partsName, _id} = order

    const orderCancelHandle = async () => {
        const { data } = await axiosPrivate.delete(`http://localhost:5000/order/${_id}`)
        if (data.success) {
            refetch()
            toast.success(data.message)
        }
    }

    return (
        <div>
            <input type="checkbox" id="cancel-order" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label for="cancel-order" class="btn btn-sm btn-circle absolute right-2 top-2">
                        ✕
                    </label>
                    <h3 class="font-bold text-lg">Are you sure?</h3>
                    <p class="py-4">
                        You want to cancel <span className="font-bold">{partsName}</span> order?
                    </p>
                    <div class="modal-action">
                        <label onClick={orderCancelHandle} for="cancel-order" class="btn">
                            Yes
                        </label>
                        <label for="cancel-order" class="btn">
                            No
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CancelModal
