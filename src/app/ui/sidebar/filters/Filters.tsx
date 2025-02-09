export default function Filters() {
    return (<form className="w-3/4 md:w-full md:h-full">
        <div className="flex flex-col md:p-4 md:w-full w-full">
            <label htmlFor="port" className="text-gray-300 text-xl mb-2 select-none">Departure Port</label>
            <input type="text" id="port" className="rounded-[4] p-2 text-xl text-slate-800 placeholder:text-slate-400" placeholder="Any port" />
        </div>
        <div className="flex flex-col md:p-4 md:w-full w-full">
            <label htmlFor="cruiseline" className="text-gray-300 text-xl mb-2 select-none">Cruiseline</label>
            <input type="text" id="cruiseline" className="rounded-[4] p-2 text-xl text-slate-800 placeholder:text-slate-400" placeholder="Any ship" />
        </div>
    </form>);
}