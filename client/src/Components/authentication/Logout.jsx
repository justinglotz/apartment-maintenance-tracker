import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/context";

export const Layout = () => {
    const { logout } = useAuth();
    return (
        <div>
            <nav className="bg-slate-800 shadow-sm border-b border-gray-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-end">
                    <button 
                        onClick={logout}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm">
                        Logout
                    </button>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    )
}