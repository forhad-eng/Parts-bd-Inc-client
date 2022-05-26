import React from 'react'
import Helmet from 'react-helmet'

const SetTitle = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

export default SetTitle
