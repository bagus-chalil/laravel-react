import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';


export default function Dashboard(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [isNotif, setIsNotif] = useState(false)

    const handleSubmit = () => {
        const data = {
            title, description, category
        }

        router.post('/insert-news',data)
        setIsNotif(true)
        setTitle('')
        setDescription('')
        setCategory('')
    }

    useEffect(() => {
        if (!props.allNews) {
            router.get('/news');
        }
        return
    },[])

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Berita</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {isNotif &&
                            <div role="alert" className="alert alert-success">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{props.flash.message}!</span>
                            </div>
                        }

                        <input type="title" placeholder="Type title" className="m-3 input input-bordered w-full"
                        onChange={(title)=>setTitle(title.target.value)} value={title} />

                        <input type="description" placeholder="Type description" className="m-3 input input-bordered w-full"
                        onChange={(description)=>setDescription(description.target.value)} value={description}/>

                        <input type="category" placeholder="Type Category" className="m-3 input input-bordered w-full"
                        onChange={(category)=>setCategory(category.target.value)} value={category}/>

                        <button className='btn btn-primary m-2' onClick={()=>handleSubmit()}> Submit </button>
                    </div>
                </div>
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4'>
                    {props.allNews && props.allNews.length > 0 ? props.allNews.map((news,i) => {
                        return (
                        <div key={i} className="card w-full bg-base-100 shadow-xl m-2">
                        <div className="card-body">
                            <h2 className="card-title">
                            {news.title}
                            <div className="badge badge-secondary">{news.category}</div>
                            </h2>
                            <p>{news.description}</p>
                            <div className="card-actions justify-end">
                            <div className="badge badge-outline">
                                <Link href={route('news.edit')} method='GET' data={{id : news.id}}>Edit</Link>
                            </div>
                            <div className="badge badge-outline">
                                <Link href={route('news.delete')} method='POST' data={{id : news.id}}>Delete</Link>
                            </div>
                            </div>
                        </div>
                        </div>
                        )
                    }) : <p> Tidak ada berita!</p>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
