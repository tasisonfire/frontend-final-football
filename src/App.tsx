import "@/App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "@/pages/home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
  ]);
  return (
    <>
      <div>
        <p>
          <a href="/">Home</a>
        </p>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
