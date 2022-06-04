import AOS from 'aos'
import 'aos/dist/aos.css'
import React, { useEffect } from 'react'
import SetTitle from '../Shared/SetTitle'
import Banner from './Banner'
import BusinessSummary from './BusinessSummary'
import FeaturedParts from './FeaturedParts'
import Info from './Info'
import LastSixReview from './LastSixReview'
import Offers from './Offers'
import Testimonial from './Testimonial'

const Home = () => {
    useEffect(() => {
        AOS.init()
    }, [])

    return (
        <div className="mb-32">
            <SetTitle title={'Parts-bd Inc'} />
            <Banner />
            <Info />
            <FeaturedParts />
            <Offers />
            <Testimonial />
            <LastSixReview />
            <BusinessSummary />
        </div>
    )
}

export default Home
