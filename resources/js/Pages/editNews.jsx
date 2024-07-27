import React, { useState } from "react";
import { Head, router } from '@inertiajs/react';
import Navbar from "@/Components/Navbar";

export default function editNews(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [isNotif, setIsNotif] = useState(false)

    const handleSubmit = () => {
        const data = {
            id: props.myNews.id,title, description, category
        }

        router.post('/update-news',data)
        setIsNotif(true)
        setTitle('')
        setDescription('')
        setCategory('')
    }

    return (
        <div className='min-h-screen bg-neutral-800 text-white text-2xl'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="card w-full bg-base-100 shadow-xl m-2">
                <div className="p-4 text-2">Edit Berita</div>
                <div className="card-body">
                    <input type="title" placeholder="Type title" className="m-3 input input-bordered w-full"
                    onChange={(title)=>setTitle(title.target.value)} defaultValue={props.myNews.title} />

                    <input type="description" placeholder="Type description" className="m-3 input input-bordered w-full"
                    onChange={(description)=>setDescription(description.target.value)} defaultValue={props.myNews.description}/>

                    <input type="category" placeholder="Type Category" className="m-3 input input-bordered w-full"
                    onChange={(category)=>setCategory(category.target.value)} defaultValue={props.myNews.category}/>

                    <button className='btn btn-primary m-2' onClick={()=>handleSubmit()}> Submit </button>
                </div>
            </div>
        </div>
    )

}
