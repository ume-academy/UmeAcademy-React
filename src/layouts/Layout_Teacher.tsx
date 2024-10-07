import { Outlet } from "react-router-dom"
import Sidebar_Teacher from "../Components/teacher/SidebarTeacher/Sidebar_Teacher"

const Layout_Teacher = () => {
    return (
        <>
            <div className="py-[80px] my-6 container mx-auto">
                <div className="flex gap-4">
                    {/* Sidebar */}
                    <div className="w-[25%]">
                        <Sidebar_Teacher />
                    </div>

                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout_Teacher