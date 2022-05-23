import React from 'react'
import Banner from './Banner'
import BusinessSummary from './BusinessSummary'
import FeaturedParts from './FeaturedParts'
import Info from './Info'
import Offers from './Offers'

const Home = () => {
    return (
        <div>
            <Banner />
            <Info />
            <FeaturedParts />
            <Offers />
            <BusinessSummary />
        </div>
    )
}

export default Home
