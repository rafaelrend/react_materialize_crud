// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";
import BookIcon from "@material-ui/icons/Book";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import Author from "views/App/author/author.jsx";
import Book from "views/App/book/book.jsx";
import Constants from "../views/App/Constants"


const dashboardRoutes = [
  /* {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },  */ 
    //Constants.URL_BASE_PATH +
  {
    path:  Constants.URL_BASE_PATH + "book",
    sidebarName: "Book",
    navbarName: "Book",
    icon: BookIcon,
    component: Book
  },

  {
    path:   Constants.URL_BASE_PATH + "author",
    sidebarName: "Author",
    navbarName: "Author",
    icon: PeopleIcon,
    component: Author
  },
   
   /* {
    path: "/user",
    sidebarName: "Table List",
    navbarName: "Table List",
    icon: PeopleIcon,
    component: UserProfile
  },

  {
    path: "/typography",
    sidebarName: "Typography",
    navbarName: "Typography",
    icon: LibraryBooks,
    component: Typography
  },
  {
    path: "/icons",
    sidebarName: "Icons",
    navbarName: "Icons",
    icon: BubbleChart,
    component: Icons
  },
  {
    path: "/maps",
    sidebarName: "Maps",
    navbarName: "Map",
    icon: LocationOn,
    component: Maps
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    icon: Notifications,
    component: NotificationsPage
  },
  {
    path: "/upgrade-to-pro",
    sidebarName: "Upgrade To PRO",
    navbarName: "Upgrade To PRO",
    icon: Unarchive,
    component: UpgradeToPro
  }
  */
  ,{ redirect: true, path: "/" , to: Constants.URL_BASE_PATH + "book", navbarName: "Redirect" }
];

export default dashboardRoutes;
