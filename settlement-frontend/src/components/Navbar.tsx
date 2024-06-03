export const Navbar = () => {
    const path = window.location.pathname;
    console.log(path);
    return (
        <div className="w-full bg-slate-600 py-4 px-8">
            <ul className="flex flex-row justify-end gap-3 text-xl">
                <li><a href="/" className={`text-white ${path === "/" ? "font-bold" : ""}`}>Detail</a></li>
                <li><a href="/party-a" className={`text-white ${path === "/party-a" ? "font-bold" : ""}`}>Party A</a></li>
                <li><a href="/party-b" className={`text-white ${path === "/party-b" ? "font-bold" : ""}`}>Party B</a></li>
            </ul>
        </div>
    );
};