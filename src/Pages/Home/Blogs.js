import React from 'react'
import code from '../../assets/code.png'
import inheritancePic from '../../assets/inheritance.png'
import reactPic from '../../assets/react.png'
import unitTesting from '../../assets/unit-testing.png'
import SetTitle from '../Shared/SetTitle'

const Blogs = () => {
    return (
        <section className="blog py-10 px-4 md:px-8 lg:px-14 lg:pb-14 bg-[#e5e5e5]">
            <SetTitle title={'Blogs'} />
            <div className="max-w-7xl mx-auto">
                <p className="text-2xl md:text-3xl text-center mb-5">𝒲𝑒𝓁𝒸𝑜𝓂𝑒 𝒯𝑜 𝐵𝓁𝑜𝑔𝓈</p>
                <div className="lg:w-9/12 mx-auto p-4 bg-white rounded">
                    <div>
                        <p className="text-2xl md:text-3xl">How to improve the performance of a React Application?</p>
                        <p className="text-sm text-gray-500">Posted on 25 May 2022</p>
                        <hr className="my-1" />
                        <img src={reactPic} style={{ margin: '15px auto' }} className="lg:h-96" alt="" />

                        <div className="lg:px-10">
                            <p>
                                Optimizing application performance is key for developers who are mindful of keeping a
                                user’s experience positive to keep them on an app and engaged. According to research by
                                Akamai, a second delay in load time can cause a 7 percent reduction in conversions,
                                making it imperative for developers to create apps with optimized performance. In React
                                applications, we are guaranteed a very fast UI by default. However, as an application
                                grows, developers may encounter some performance issues. Here are five important ways to
                                optimize the performance of a React application.
                            </p>
                            <ul className="list-disc pl-4 pt-6">
                                <li> Keeping component state local where necessary</li>
                                <li>Memoizing React components to prevent unnecessary re-renders</li>
                                <li>Code-splitting in React using dynamic import()</li>
                                <li>Windowing or list virtualization in React</li>
                                <li>Lazy loading images in React</li>
                            </ul>
                        </div>
                    </div>

                    <hr className="mt-10" />

                    <div>
                        <p className="text-2xl md:text-3xl">Different ways to manage a state in a React application.</p>
                        <p className="text-sm text-gray-500">Posted on 1st May 2022</p>
                        <hr className="my-1" />
                        <img src={reactPic} style={{ margin: '15px auto' }} className="lg:h-96" alt="" />

                        <div className="lg:px-10">
                            <p className="text-lg  mt-4">
                                There are four main types of state we need to properly manage in our React apps:
                            </p>
                            <ul className="list-disc pl-8">
                                <li>Local state</li>
                                <li>Global state</li>
                                <li>Server state</li>
                                <li>URL state</li>
                            </ul>
                            <p className="my-2">
                                <span className="font-semibold">Local state:</span>{' '}
                                <span className="bg-[#e5e5e5] px-1">useState hook</span> is the first tool one should
                                reach for to manage local state in react components. useReducer is another option that
                                can be used for either local or global state management.
                            </p>
                            <p className="mb-2">
                                <span className="font-semibold">Global state:</span> To manage it, we can use built-in
                                React features like the <span className="bg-[#e5e5e5] px-1">Context API</span> or a
                                third party solution like Redux.
                            </p>
                            <p className="mb-2">
                                <span className="font-semibold">Server state:</span> It is not necessary to hit the
                                server every time user visit a page where there is no changes in data. To overcome this
                                issue we can get help from a third party library called{' '}
                                <span className="bg-[#e5e5e5] px-1">React Query</span>. What React Query does is that,
                                it cache the data and if there is no changes in data on subsequent request then it
                                simply return the data from cache.
                            </p>
                            <p>
                                <span className="font-semibold">URL state:</span> URL state is quite easy to manage,
                                usually through custom hooks that give us all the information we need about our
                                location, history, and pathname. We can manage all URL related data using third party
                                library like <span className="bg-[#e5e5e5] px-1">React router dom</span>
                            </p>
                        </div>
                    </div>

                    <hr className="mt-10" />

                    <div>
                        <p className="text-2xl md:text-3xl">How does prototypical inheritance work?</p>
                        <p className="text-sm text-gray-500">Posted on 1st May 2022</p>
                        <hr className="my-1" />
                        <img src={inheritancePic} style={{ margin: '15px auto' }} className="lg:h-80" alt="" />

                        <div className="lg:px-10">
                            <p>
                                <span className="font-semibold">How it works:</span> Every object with its methods and
                                properties contains an internal and hidden property known as [[Prototype]]. The
                                Prototypal Inheritance is a feature in javascript used to add methods and properties in
                                objects. It is a method by which an object can inherit the properties and methods of
                                another object. Traditionally, in order to get and set the [[Prototype]] of an object,
                                we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it
                                is being set using __proto__.
                            </p>
                        </div>
                    </div>

                    <hr className="mt-10" />

                    <div className="mb-14">
                        <p className="text-2xl md:text-3xl">The reason why we don't set the state directly in React</p>
                        <p className="text-sm text-gray-500">Posted on 1st May 2022</p>
                        <hr className="my-1" />
                        <img src={reactPic} style={{ margin: '15px auto' }} className="lg:h-96" alt="" />

                        <div className="leading-8 tracking-wide">
                            <p className="font-bold">Reason includes: </p>
                            <ul className="list-disc pl-8">
                                <li>
                                    If we update it directly, calling the setState() afterward may just replace the
                                    update we made.
                                </li>
                                <li>
                                    When we directly update the state, it does not change this.state immediately.
                                    Instead, it creates a pending state transition, and accessing it after calling this
                                    method will only return the present value.
                                </li>
                                <li>And eventually, we will lose control of the state across all components</li>
                            </ul>
                        </div>
                    </div>

                    <hr className="mt-10" />

                    <div>
                        <p className="text-2xl md:text-3xl">How to implement search to find products by name</p>
                        <p className="text-sm text-gray-500">Posted on 1st May 2022</p>
                        <hr className="my-1" />
                        <img src={code} style={{ margin: '0 auto' }} className="lg:h-96" alt="" />
                    </div>

                    <hr className="mt-10" />

                    <div className="pb-10">
                        <p className="text-2xl md:text-3xl">What is a unit test? Why should write unit tests?</p>
                        <p className="text-sm text-gray-500">Posted on 1st May 2022</p>
                        <hr className="my-1" />
                        <img src={unitTesting} style={{ margin: '15px auto' }} className="lg:h-80" alt="" />

                        <div className="lg:px-10">
                            <p>
                                <span className="font-semibold">Unit Testing:</span> Unit testing is a software
                                development process in which the smallest testable parts of an application, called
                                units, are individually and independently scrutinized for proper operation. This testing
                                methodology is done during the development process by the software developers and
                                sometimes QA staff. The main objective of unit testing is to isolate written code to
                                test and determine if it works as intended.
                            </p>
                            <div className="mt-2">
                                <span className="font-semibold">Why should write Unit Testing:</span>
                                <ul className="list-disc pl-8">
                                    <li>The earlier a problem is identified, the fewer compound errors occur.</li>
                                    <li>
                                        Costs of fixing a problem early can quickly outweigh the cost of fixing it
                                        later.
                                    </li>
                                    <li>Debugging processes are made easier.</li>
                                    <li>Developers can quickly make changes to the code base.</li>
                                    <li>Developers can also re-use code, migrating it to new projects.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Blogs
