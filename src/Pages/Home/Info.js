import React from 'react'
import pic1 from '../../assets/icons/free-delivery.png'
import pic4 from '../../assets/icons/hot-offer.png'
import pic3 from '../../assets/icons/secure-payment.png'
import pic2 from '../../assets/icons/service.png'

const Info = () => {
    const items = [
        { image: pic1, title: 'Free Shipping', des: 'For orders from $50' },
        { image: pic2, title: 'Support 24/7', des: 'Call us anytime' },
        { image: pic3, title: '100% Safety', des: 'Only secure payments' },
        { image: pic4, title: 'Hot Offers', des: 'Discounts up to 90%' }
    ]

    return (
        <div className="max-w-7xl mx-auto lg:px-10">
            <div className="grid lg:grid-cols-4 gap-5 my-8">
                {items.map((item, index) => (
                    <div key={index} className="flex justify-evenly items-center">
                        <img className="w-12" src={item.image} alt="" />
                        <div>
                            <h5 className="text-md font-semibold">{item.title}</h5>
                            <p className="text-sm">{item.des}</p>
                        </div>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    )
}

export default Info
