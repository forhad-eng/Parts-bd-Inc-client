import React from 'react'

const Testimonial = () => {
    return (
        <div className="testimonial">
            <div class="avatar flex justify-center pt-40">
                <div class="w-20 rounded-full ring ring-primary ring-offset-base-100">
                    <img src="https://api.lorem.space/image/face?hash=92310" alt="person" />
                </div>
            </div>
            <p className="desc text-center font-mono px-3 md:px-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum commodi alias, nesciunt, quisquam dolorum
                incidunt ut nostrum soluta quos id nemo distinctio illum. Culpa excepturi explicabo a voluptate
                necessitatibus doloremque similique natus libero quis sint nobis rerum non saepe suscipit, dolorem quod
                amet eligendi sapiente esse nihil labore repellendus eum laboriosam error.
            </p>
            <p className="text-center mt-10 text-[#F1EEEF] uppercase font-mono">~ Jhonny Depp ~</p>
        </div>
    )
}

export default Testimonial
