import { IoHomeOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";

export const sidebarList = [
    {
        "icon" : IoHomeOutline,
        "altIcon" : IoHomeSharp,
        "title" : "Home",
        "path" : '/'
    },
    {
        "icon" : IoMdAddCircleOutline,
        "altIcon" : IoMdAddCircle,
        "title" : "Create",
        "path" : null
    },
    {
        "icon" : IoSearchOutline,
        "altIcon" : IoSearchSharp,
        "title" : "Search",
        "path" : '/search'
    },
    {
        "icon" : AiOutlineMessage,
        "altIcon" : AiFillMessage,
        "title" : "Message",
        "path" : '/messages'
    },
    {
        "icon" : IoMdNotificationsOutline,
        "altIcon" : IoMdNotifications,
        "title" : "Notifications",
        "path" : null
    },
    
]