import React from 'react';

export default function SortByBox() {
    return (<React.Fragment>
        <div className="flex flex-row border-2 border-gray-200 rounded-[4] py-1 px-3 mx-2 shadow-md cursor-pointer">
            <div className="flex flex-col">
                <span className="font-semibold">Price</span>
                <span className="font-semibold text-gray-400">Lowest first</span>
            </div>
            <span>🔻</span>
        </div>
    </React.Fragment>)
}