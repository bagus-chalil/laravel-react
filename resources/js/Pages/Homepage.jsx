import React from "react";
import { Link, Head } from '@inertiajs/react';

export default function Homepage(props) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-neutral-800 text-white text-2xl">
            <Head title={props.title} />
            { props.news ? props.news.map((data, i) =>{
                return (
                    <div key={i} className="p-4 m-2 bg-white text-black">
                        <p>{props.description}</p>
                        <p>{data.title}</p>
                        <p>{data.description}</p>
                        <p>{data.author}</p>
                    </div>
                )
            }) : "Tidak Ada Data"}
        </div>
    )

}
