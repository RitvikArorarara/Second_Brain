import type { ReactElement } from "react"

interface SideBarItemProps {
  icon: ReactElement
  text: string
  selected?: boolean
  onClick: () => void
}

export function SideBarItem({ icon, text, selected, onClick }: SideBarItemProps) {
  return (
    <div
      className={`flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all ${selected ? "bg-purple-600 text-white" : ""}`}
      onClick={onClick}
    >
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </div>
  )
}
