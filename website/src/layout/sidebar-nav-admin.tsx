import {
    AreaChart,
  FileIcon,
  HeartIcon,
  HistoryIcon,
  LayoutDashboardIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react"

type Nav = { text: string; href: string; icon: JSX.Element }[]

export const sidebarNavAdmin: Nav = [
  {
    text: "Overview",
    href: "/admin",
    icon: <AreaChart />,
  },
  {
    text: "Users",
    href: "/admin/users",
    icon: <UsersIcon />,
  },
  {
    text: "Files",
    href: "/admin/files",
    icon: <FileIcon />,
  },
]
