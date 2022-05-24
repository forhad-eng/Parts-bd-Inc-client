import React from 'react'

const MyOrderRow = ({ order, setOrder, index }) => {
    const { partsName, quantity, amount, paid } = order

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{partsName}</td>
            <td>{quantity}</td>
            <td>{amount}</td>
            <td>{paid ? 'Paid' : <button className="btn btn-success btn-xs">Pay Now</button>}</td>
            <td>
                <label onClick={() => setOrder(order)} for="cancel-order" class="btn btn-xs">
                    Cancel
                </label>
            </td>
        </tr>
    )
}

export default MyOrderRow
