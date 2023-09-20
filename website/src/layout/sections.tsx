
import {
  Book,
  CameraIcon,
  FoldersIcon,
  Github,
  HeartIcon,
  HistoryIcon,
  ImageIcon,
  LayoutDashboardIcon,
  TabletSmartphoneIcon,
  Trash2Icon,
  Users2,
  VideoIcon,
} from "lucide-react"

type Section = {
  title: string
  btns: { text: string; href: string; icon: JSX.Element }[]
}

export const sections: Section[] = [
  {
    title: "Dashboard",
    btns: [
      {
        text: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboardIcon />,
      },
      {
        text: "Recents",
        href: "/dashboard/recents",
        icon: <HistoryIcon />,
      },
      {
        text: "Favorites",
        href: "/dashboard/favorites",
        icon: <HeartIcon />,
      },
      {
        text: "Trash",
        href: "/dashboard/trash",
        icon: <Trash2Icon />,
      },
    ],
  },
  {
    title: "Media",
    btns: [
      {
        text: "All media",
        href: "/dashboard/all-media",
        icon: <CameraIcon />,
      },
      {
        text: "Images",
        href: "/dashboard/images",
        icon: <ImageIcon />,
      },
      {
        text: "Videos",
        href: "/dashboard/videos",
        icon: <VideoIcon />,
      },
      {
        text: "Favorites",
        href: "/dashboard/favorites",
        icon: <HeartIcon />,
      },
      {
        text: "Albums",
        href: "/dashboard/albums",
        icon: <FoldersIcon />,
      },
    ],
  },
  {
    title: "Shared",
    btns: [
      {
        text: "Devices",
        href: "/dashboard/devices",
        icon: <TabletSmartphoneIcon />,
      },
      {
        text: "Team",
        href: "/dashboard/team",
        icon: <Users2 />,
      },
    ],
  },
]
