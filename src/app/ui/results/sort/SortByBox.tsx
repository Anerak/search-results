"use client"
import { modifySearchQuery } from '@/app/utils/utils';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReadonlyURLSearchParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';

type SortByBoxProps = {
    callback: (key: string, value: string) => void;
    params: ReadonlyURLSearchParams;
}

export default function SortByBox({ params }: SortByBoxProps) {
    const router = useRouter();
    const pathname = usePathname();

    const [sortingOption, setSortingOption] = React.useState(params.get('sort') || 'price');
    const [sortingOrder, setSortingOrder] = React.useState(params.get('order') || 'asc');


    const handleSortingOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const { value } = event.target;
        setSortingOption(value);
        router.push(`${pathname}?${updateQuery(params, 'sort', value)}`);
    }

    const handleSortingOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const { value } = event.target;
        setSortingOrder(value);
        router.push(`${pathname}?${updateQuery(params, 'order', value)}`);
    }

    React.useEffect(() => {
        setSortingOption(params.get('sort') || 'price');
        setSortingOrder(params.get('order') || 'asc');
    }, [params]);

    const updateQuery = React.useCallback(modifySearchQuery, [params])

    return (<React.Fragment>
        <div className="flex flex-row border-2 border-gray-200 rounded-[4] py-1 px-3 mx-2 shadow-md cursor-pointer">
            <div className="flex flex-col">
                <div className="font-semibold hover:shadow-md select-none" >
                    <select name="sort" id="sort" className='w-auto appearance-none' onChange={handleSortingOptionChange} value={sortingOption}>
                        <option value="price">Price</option>
                        <option value="departureDate">Departure Date</option>
                        <option value="duration">Duration</option>
                    </select>
                </div>
                <div className="font-semibold text-gray-400 hover:shadow-md select-none" >
                    <select name="order" id="order" value={sortingOrder} className='w-auto appearance-none' onChange={handleSortingOrderChange}>
                        <option value="asc">Lowest first</option>
                        <option value="desc">Highest first</option>
                    </select>
                </div>
            </div>
            <label className='ml-1' htmlFor="sort">
                <FontAwesomeIcon icon={faCaretDown} />
            </label>
        </div>
    </React.Fragment>)
}