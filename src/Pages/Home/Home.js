import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import SetTitle from '../Shared/SetTitle'
import Banner from './Banner'
import Blog from './Blog'
import BusinessSummary from './BusinessSummary'
import EmailSubscription from './EmailSubscription'
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
            <Blog />
            <EmailSubscription />
        </div>
    )
}

export default Home
