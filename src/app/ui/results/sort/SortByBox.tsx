import React from 'react';

export default function SortByBox() {
    return (<React.Fragment>
        <div className="flex flex-row border-2 border-gray-400 rounded-[4] p-1 mx-2 shadow-md cursor-pointer">
            <div className="flex flex-col">
                <span className="font-semibold">Price</span>
                <span className="font-semibold text-gray-500">Lowest first</span>
            </div>
            <span>🔻</span>
        </div>
    </React.Fragment>)
}