import React from 'react';
import Prompt from './Prompt';

export default async function Page () {
    return (
        <>
        <div className='mb-4'>
            <h1 className='text-2xl my-2 font-bold'>Create a new form</h1>
            <p className='text-gray-500'>Start by giving your form a name and then type your requirements below</p>
        </div>
            <Prompt />
        </>
    )
}
