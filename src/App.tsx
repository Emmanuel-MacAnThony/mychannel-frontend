import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./features/home/Home";
import React from "react";
import Explore from "./features/home/Explore";
import ToggleColorMode from "./components/ToggleColorMode";
import Server from "./features/chat/Server";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/server/:serverId/:channelId?" element={<Server />} />
      <Route path="/explore/:categoryName" element={<Explore />} />
    </Route>
  )
);

const App: React.FC = () => {
  return (
    <ToggleColorMode>
      <RouterProvider router={router} />
    </ToggleColorMode>
  );
};

export default App;
