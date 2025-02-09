import React from "react";
import Logo from "@/app/ui/shared/Logo";
import Filters from "@/app/ui/sidebar/filters/Filters"

export default function Sidebar() {
    return <React.Fragment>
        <aside className="min-w-max w-screen md:w-1/5 bg-[--bg-sidebar] text-white p-4 mb-2 md:p-0 md:h-full">
            <nav className="flex flex-row-reverse">
                {/* //TODO Fix Icon*/}
                <button className="bg-[--bg-btn-back] p-3 m-4 rounded-[4]">&larr;</button>
            </nav>
            <div className="flex flex-row md:flex-col md:content-between">
                <Filters />
            </div>
            <div className="hidden md:block self-end relative mt-auto">
                <Logo />
            </div>
        </aside>
    </React.Fragment>;
}