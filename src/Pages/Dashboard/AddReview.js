import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import ReactStars from 'react-rating-stars-component'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'
import auth from '../../Firebase/firebase.init'
import SetTitle from '../Shared/SetTitle'

const AddReview = () => {
    const [user] = useAuthState(auth)
    const [rating, setRating] = useState(0)

    const reviewHandle = async e => {
        e.preventDefault()
        const description = e.target.ratingDes.value
        const review = {
            user: user.email,
            rating,
            description
        }

        const { data } = await axiosPrivate.post('https://parts-bd-inc-server.vercel.app/review', review)
        if (data.success) {
            e.target.reset()
            toast.success(data.message)
        }
    }

    return (
        <div>
            <SetTitle title={'Add Review'} />
            <h2 className="text-2xl font-bold pt-4 pl-10 mb-2">Add Review</h2>
            <hr className="border-[#21252c] h-[4px] mb-6 w-full" />
            <form onSubmit={e => reviewHandle(e)} className="card max-w-sm lg:max-w-sm shadow">
                <div className="mb-4 pl-10">
                    <label className="font-bold">Ratings</label>
                    <ReactStars count={5} onChange={setRating} size={24} activeColor="#ffd700" />
                    <label className="font-bold block mt-2">Description</label>
                    <textarea
                        name="ratingDes"
                        cols="30"
                        rows="5"
                        className="border-[1px] rounded-lg text-black mt-2 pl-4 pt-2"
                    ></textarea>
                    <button className="btn btn-primary w-fit my-4">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddReview
