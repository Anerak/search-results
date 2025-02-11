import React from "react";
import Logo from "@/app/ui/shared/Logo";
import Filters from "@/app/ui/sidebar/filters/Filters"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
    return <React.Fragment>
        <aside className="min-w-max md:w-1/5 bg-[--bg-sidebar] text-white p-4 md:p-0 md:h-full xl:max-w-[10%] flex flex-col">
            <nav className="flex flex-row-reverse">
                <button className="bg-[--bg-btn-back] p-3 m-4 rounded-[4]">
                    <FontAwesomeIcon icon={faArrowLeft} className="w-4" />
                </button>
            </nav>
            <div className="flex flex-row md:flex-col md:content-between flex-grow">
                <Filters />
            </div>
            <div className="hidden md:block p-8">
                <Logo />
            </div>
        </aside>
    </React.Fragment>;
}