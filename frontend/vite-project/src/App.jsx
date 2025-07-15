import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./First";
import Home from "./Home";
import './App.css'; 


const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
