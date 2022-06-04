import { faCommentAlt, faDollar, faTools, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Counter from '../Shared/Counter'

const BusinessSummary = () => {
    return (
        <div>
            <h2 className="text-3xl uppercase font-semibold text-center">Our Statistics At A Glance</h2>
            <p p className="w-fit mx-auto text-gray-400">
                Get Insight
            </p>
            <hr className="border-primary w-20 h-[1px] mx-auto" />
            <hr className="border-primary w-16 h-[1px] mx-auto mt-1" />
            <hr className="border-primary w-12 h-[1px] mx-auto mt-1" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 my-14 md:mt-16 md:mb-24 md:px-24 text-center">
                <div>
                    <FontAwesomeIcon icon={faUserAlt} className="w-6 h-6 text-primary bg-gray-100 rounded-full p-3" />
                    <p className="uppercase text-md font-[600] mt-2">Served Customer</p>
                    <hr className="block mx-auto mt-2 h-[2px] w-6 bg-primary border-none" />
                    <Counter end="380" />
                </div>
                <div>
                    <FontAwesomeIcon icon={faDollar} className="w-6 h-6 text-primary bg-gray-100 rounded-full p-3" />
                    <p className="uppercase text-md font-[600] mt-2">Annual Revenue</p>
                    <hr className="block mx-auto mt-2 h-[2px] w-6 bg-primary border-none" />
                    <Counter end="150">
                        <span>m</span>
                    </Counter>
                </div>
                <div>
                    <FontAwesomeIcon
                        icon={faCommentAlt}
                        className="w-6 h-6 text-primary bg-gray-100 rounded-full p-3"
                    />
                    <p className="uppercase text-md font-[600] mt-2">Total Reviews</p>
                    <hr className="block mx-auto mt-2 h-[2px] w-6 bg-primary border-none" />
                    <Counter end="1150">
                        <span>+</span>
                    </Counter>
                </div>
                <div>
                    <FontAwesomeIcon icon={faTools} className="w-6 h-6 text-primary bg-gray-100 rounded-full p-3" />
                    <p className="uppercase text-md font-[600] mt-2">Parts Manufacturing</p>
                    <hr className="block mx-auto mt-2 h-[2px] w-6 bg-primary border-none" />
                    <Counter end="60">
                        <span>+</span>
                    </Counter>
                </div>
            </div>
        </div>
    )
}

export default BusinessSummary
