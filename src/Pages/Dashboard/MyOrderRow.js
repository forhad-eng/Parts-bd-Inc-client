import React from 'react'
import { Link } from 'react-router-dom'

const MyOrderRow = ({ order, setOrder, index }) => {
    const { _id, partsName, quantity, amount, paid } = order

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{partsName}</td>
            <td>{quantity}</td>
            <td>{amount}</td>
            <td>
                {paid ? (
                    <p className="text-success">Paid</p>
                ) : (
                    <Link to={`/dashboard/payment/${_id}`}>
                        <button className="btn btn-success btn-xs">Pay Now</button>
                    </Link>
                )}
            </td>
            <td>
                {!paid && (
                    <label onClick={() => setOrder(order)} for="cancel-order" class="btn btn-xs">
                        Cancel
                    </label>
                )}
            </td>
        </tr>
    )
}

export default MyOrderRow
