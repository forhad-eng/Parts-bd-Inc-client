import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import developer from '../../assets/developer.png'
import '../../Styles/About.css'
import SetTitle from '../Shared/SetTitle'

const MyPortfolio = () => {
    return (
        <div className="about-me grid md:grid-cols-2 md:gap-10 px-4 md:px-14 lg:px-20">
            <SetTitle title={'My Portfolio'} />
            <div className="mx-auto mb-80 md:mb-0 md:mt-24 order-2 md:order-1">
                <h2 className="text-4xl font-[600]">Hello, It's me Forhad Uddin</h2>
                <p>
                    <small>Frontend Developer</small>
                </p>
                <div className="my-3 ">
                    <p>I am a CS graduate from International Islamic University Chittagong(IIUC).</p>
                    <p>
                        I am proficient in HTML5, CSS3, Tailwind, Bootstrap, JavaScript, ES6, React.js and comfortable
                        in React Query, Node.js, Express.js, MongoDB, DaisyUI.
                    </p>
                    <p className="font-bold mt-2">Here are few of my Projects:</p>
                    <ul className="list-decimal pl-8">
                        <li className="text-sm">
                            <span className="font-bold">NextGen Automobiles</span> |
                            <a
                                className="text-blue-600"
                                href="https://nextgen-automobiles.web.app/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {' '}
                                WEBSITE{' '}
                            </a>
                            |
                            <a
                                className="text-blue-600"
                                href="https://github.com/forhad-eng/nextgen-automobiles-client.git"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {' '}
                                GITHUB (CLIENT)
                            </a>{' '}
                            |{' '}
                            <a
                                className="text-blue-600"
                                href="https://github.com/forhad-eng/nextgen-automobiles-server.git"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GITHUB (SERVER)
                            </a>
                            <p>
                                <span className="bg-[#e5e5e5] px-1">Frontend Technology:</span> HTML5, CSS3, Tailwind,
                                Firebase, React.js, React Router.
                            </p>
                            <p>
                                {' '}
                                <span className="bg-[#e5e5e5] px-1">Backend Technology:</span> JWT, Express.js, MongoDB.
                            </p>
                        </li>

                        <li className="text-sm">
                            <span className="font-bold">Wellbeing Dental</span> |
                            <a
                                className="text-blue-600"
                                href="https://wellbeing-dental.web.app/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {' '}
                                WEBSITE{' '}
                            </a>
                            |
                            <a
                                className="text-blue-600"
                                href="https://github.com/forhad-eng/welbeing-dental"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {' '}
                                GITHUB
                            </a>
                            <p>
                                <span className="bg-[#e5e5e5] px-1">Technology:</span> HTML5, CSS3, Tailwind, Firebase,
                                React.js, React-router.
                            </p>
                        </li>
                        <li className="text-sm">
                            <span className="font-bold">React Quiz Application</span> |
                            <a
                                className="text-blue-600"
                                href="https://dashing-gelato-2982e1.netlify.app/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {' '}
                                WEBSITE{' '}
                            </a>
                            |
                            <a
                                className="text-blue-600"
                                href="https://github.com/forhad-eng/React-Quiz-Application.git"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {' '}
                                GITHUB
                            </a>{' '}
                            <p>
                                <span className="bg-[#e5e5e5] px-1">Technology:</span> HTML5,Tailwind, React.js.
                            </p>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">Send me email</p>
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faPaperPlane} />{' '}
                        <a className="text-blue-600" href="mailto:forhadu.cse@gmail.com">
                            forhadu.cse@gmail.com
                        </a>
                    </div>
                </div>
            </div>

            <div className="developer order-1 md:order-2">
                <img src={developer} alt="" />
            </div>
        </div>
    )
}

export default MyPortfolio
