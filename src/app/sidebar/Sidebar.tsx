"use client"
import React from "react";

export default function Sidebar() {
    const [isOpen, toggleSidebar] = React.useState(true);

    const handleToggleClick = (): void => toggleSidebar(!isOpen);

    return <React.Fragment>
        <aside className={`min-w-max w-screen md:w-1/4 bg-[--bg-sidebar] text-white p-4`}>
            <div className="flex flex-row-reverse">
                {/* //TODO Fix Icon*/}
                <button className="bg-[--bg-btn-back] p-3 rounded-md" onClick={handleToggleClick}>&larr;</button>
            </div>
            <form className="form">
                <div className="input-group">
                    <label htmlFor="port">Departure Port</label>
                    <input type="text" id="port" className="h-8" />
                </div>
            </form>
        </aside>
    </React.Fragment>;
}