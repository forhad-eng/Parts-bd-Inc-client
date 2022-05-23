import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const PartsCard = ({ parts }) => {
    const { _id, name, image, price, description, minOrder, available } = parts
    return (
        <div class="card bg-base-100 shadow-lg">
            <figure>
                <img src={image} alt="Shoes" />
            </figure>
            <div class="card-body pt-0">
                <h2 class="card-title">{name}</h2>
                <p className="mb-0">{description}</p>
                <small>
                    Minimum order: <span className="text-orange-600 font-bold">{minOrder} Piece</span>
                </small>
                <small>
                    Available: <span className="text-orange-600 font-bold">{available} Piece</span>
                </small>
                <div className="flex justify-between items-center">
                    <p className="font-bold">${price}</p>
                    <Link to={`/purchase/${_id}`}>
                        <button className="btn btn-primary btn-sm">
                            Place Order <FontAwesomeIcon className="ml-1" icon={faShoppingCart} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PartsCard
