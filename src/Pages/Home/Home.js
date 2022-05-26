import React from 'react'
import SetTitle from '../Shared/SetTitle'
import Banner from './Banner'
import BusinessSummary from './BusinessSummary'
import FeaturedParts from './FeaturedParts'
import Info from './Info'
import LastSixReview from './LastSixReview'
import Offers from './Offers'

const Home = () => {
    return (
        <div className="mb-32">
            <SetTitle title={'Parts-bd Inc'} />
            <Banner />
            <Info />
            <FeaturedParts />
            <Offers />
            <LastSixReview />
            <BusinessSummary />
        </div>
    )
}

export default Home
