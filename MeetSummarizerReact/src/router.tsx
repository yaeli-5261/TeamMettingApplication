import { createBrowserRouter, Outlet } from "react-router-dom"; // תיקון: שינוי ל-"react-router-dom"
import HomePage from "./components/Pages/HomePage";
import Layout from "./components/Layout";
import FileUploader from "./components/File/FileUploader";
import MeetingsPage from "./components/Pages/MeetingsPage";
import SignIn from "./components/login/SignIn";
import AddMeetingForm from "./components/Meeting/AddMeetingForm";
import MeetingDetails from "./components/Meeting/MeetingDetails";
import UpdateMeetingDialog from "./components/Meeting/UpdateMeetingDialog";
import TeamChat from "./components/chat/chat-message";
import ProtectedRoute from "./components/protected-route";
import { Settings } from "lucide-react";
import SettingsPage from "./components/Pages/setting";
// import { AppSidebar } from "./components/Pages/sideBar";


export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Layout>
                <Outlet />  
            </Layout>
        ), 
        children: [
            { path: "", element: <HomePage /> }, 

            { path: "meetings", element: 
             <ProtectedRoute>
              <MeetingsPage />
              </ProtectedRoute> 
              },
            { path: "login", element: <SignIn /> },
            { path: "add-meeting", element: <AddMeetingForm /> },
            { path: "meeting-details/:meetingId", element: < MeetingDetails/> },
            { path: "setting", element: < SettingsPage/> },

          
             { path: "chat", element: 
               <ProtectedRoute>
                <TeamChat />
              </ProtectedRoute>
              },

          

        ],     
    },
]);







// import { createBrowserRouter, Outlet } from "react-router-dom"
// import HomePage from "./components/Pages/HomePage"
// import Layout from "./components/Layout"
// import MeetingsPage from "./components/Pages/MeetingsPage"
// import SignIn from "./components/login/SignIn"
// import AddMeetingForm from "./components/Meeting/AddMeetingForm"
// import MeetingDetails from "./components/Meeting/MeetingDetails"
// import FileUploader from "./components/File/FileUploader"

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <Layout>
//         <Outlet />
//       </Layout>
//     ),
//     children: [
//       { path: "", element: <HomePage /> },
//       { path: "meetings", element: <MeetingsPage /> },
//       { path: "signIn", element: <SignIn /> },
//       { path: "add-meeting", element: <AddMeetingForm /> },
//       { path: "meeting-details/:meetingId", element: <MeetingDetails /> },
//       { path: "files", element: <FileUploader /> },

//       // Add other routes as needed
//       { path: "calendar", element: <div>Calendar Page (Coming Soon)</div> },
//       { path: "team", element: <div>Team Page (Coming Soon)</div> },
//       { path: "settings", element: <div>Settings Page (Coming Soon)</div> },
//     ],
//   },
// ])

