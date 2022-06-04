import React from 'react'
import img1 from '../../assets/blog-img1.jpg'
import img2 from '../../assets/blog-img2.jpg'

const Blog = () => {
    return (
        <div className="max-w-7xl mx-auto mb-20 px-6 lg:px-10 mt-6 md:mt-14">
            <div className="flex justify-center items-center gap-5 md:gap-10 mt-14">
                <div className="">
                    <hr className="border-[#363C45] w-12 md:w-20 h-[1px] ml-auto" />
                    <hr className="border-[#363C45] w-16 md:w-40 h-[1px] mt-1" />
                    <hr className="border-[#363C45] w-12 md:w-20 h-[1px] mt-1 ml-auto" />
                </div>
                <h2 className="text-2xl md:text-3xl text-center uppercase font-semibold">Latest Blog Post</h2>
                <div>
                    <hr className="border-[#363C45] w-12 md:w-20 h-[1px] mr-auto" />
                    <hr className="border-[#363C45] w-16 md:w-40 h-[1px] mt-1" />
                    <hr className="border-[#363C45] w-12 md:w-20 h-[1px] mt-1 mr-auto" />
                </div>
            </div>
            <hr className="border-primary w-20 h-[1px] mx-auto" />
            <hr className="border-primary w-16 h-[1px] mx-auto mt-1" />
            <hr className="border-primary w-12 h-[1px] mx-auto mt-1" />

            <div className="grid md:grid-cols-2 gap-5 mt-20">
                <GetBlog img={img1} date="04" author="Depp" />
                <GetBlog img={img2} date="12" author="Heard" />
            </div>
        </div>
    )
}

const GetBlog = ({ img, date, author }) => {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            <img src={img} alt="" className="w-full" />
            <div>
                <p className="text-primary mb-2">
                    <span className="text-4xl font-bold">{date}</span> / <span>MAY</span>{' '}
                </p>
                <p className="text-sm">
                    <span className="text-[#5A6069]">Author:</span> <span className="text-primary">{author}</span>
                </p>
                <hr className="border-[#363C45] h-[1px] mt-4" />
                <p className="text-sm text-[#5A6069] tracking-wider leading-6 mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non dicta similique alias earum doloribus
                    totam, dolore magni sint voluptatem, quasi aliquid. Explicabo sed aliquam adipisci, autem odit
                    ratione dolorem labore...
                </p>
                <button className="btn bg-[#363C45] text-[#6b6f7a] rounded-full mt-4 px-10 hover:bg-primary hover:text-white">
                    <small>Read More</small>
                </button>
            </div>
        </div>
    )
}

export default Blog
