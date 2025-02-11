import Image from 'next/image';
import React from 'react';

export default function Logo() {
    return (<div className='text-center flex flex-col gap-4 items-center'>
        <Image src='/cruisebound_logo.svg' alt="Cruisebound logo" width={64} height={0} />
        <h1 className='logo-text text-3xl select-none' aria-hidden="true">Cruisebound</h1>
    </div>);

}