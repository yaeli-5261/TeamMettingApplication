import { createBrowserRouter, Outlet } from "react-router-dom"; // תיקון: שינוי ל-"react-router-dom"
import HomePage from "./components/Pages/HomePage";
import Layout from "./components/Layout";
import MeetingsPage from "./components/Pages/MeetingsPage";
import SignIn from "./components/login/SignIn";
import AddMeetingForm from "./components/Meeting/AddMeetingForm";
import MeetingDetails from "./components/Meeting/MeetingDetails";
import TeamChat from "./components/chat/chat-message";
import ProtectedRoute from "./components/protected-route";
import SettingsPage from "./components/Pages/setting";


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

