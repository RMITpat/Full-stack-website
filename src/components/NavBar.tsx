import Link from "next/link";
import React from "react";

export default function NavBar() {

    return (
        <nav className = "bg-blue-400 p-4 w-full"> 
            <div className = "   flex items-center justify-between ">
                <div>TeachTeam</div>
                <Link href = "/registration" passHref>
                Login
                </Link>

            </div>
           
        </nav>
    );

}