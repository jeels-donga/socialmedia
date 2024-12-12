"use client";

import { sidebarLinks } from "@constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();

  return (
    <div className="sticky bottom-0 z-20 w-full bg-dark-1 px-6 py-3 flex items-center justify-between md:hidden shadow-lg rounded-t-2xl">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            key={link.label}
            href={link.route}
            className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isActive ? "bg-purple-1 text-light-1 shadow-md" : "text-light-2 hover:bg-dark-2"
              }`}
          >
            {link.icon}
            <p className={`text-small-medium max-sm:hidden ${isActive ? "font-semibold" : "font-normal"}`}>
              {link.label.split(/\s+/)[0]}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomBar;
