import React from 'react'
import CountUp from 'react-countup'

const Counter = ({ end, children }) => {
    return (
        <CountUp start={0} end={end} delay={0} duration={5}>
            {({ countUpRef }) => (
                <div className="text-3xl text-[#363636] font-[700] mt-3 md:mt-6">
                    <span ref={countUpRef} />
                    {children}
                </div>
            )}
        </CountUp>
    )
}

export default Counter
