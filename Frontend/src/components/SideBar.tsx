import { useState } from "react";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";
import { ListIcon } from "../icons/ListIcon";

export function Sidebar({onFilterChange}: {onFilterChange: (filter: string) => void}) {
  const [selectedFilter, setSelectedFilter] = useState("All");

  function handleFilterClick(filter: string) {
    setSelectedFilter(filter);
    onFilterChange(filter);
  }

  return (
    <div className="fixed h-screen bg-white border-r w-72 left-0 top-0 pl-6">
      <div className="flex text-2xl pt-8 items-center">
        <div className="pr-2 text-purple-600">
          <Logo />
        </div>
        <div className="text-purple-600">
          {localStorage.getItem("token")
            ? localStorage.getItem("username")
            : "Guest"}
          's Brain
        </div>
      </div>
      <div className="pt-4 pl-4">
        <SideBarItem
          text="All"
          icon={<ListIcon />}
          selected={selectedFilter === "All"}
          onClick={() => handleFilterClick("All")}
        />
        <SideBarItem
          text="Twitter"
          icon={<TwitterIcon />}
          selected={selectedFilter === "Twitter"}
          onClick={() => handleFilterClick("Twitter")}
        />
        <SideBarItem
          text="Youtube"
          icon={<YoutubeIcon />}
          selected={selectedFilter === "Youtube"}
          onClick={() => handleFilterClick("Youtube")}
        />
      </div>
    </div>
  );
}
