import { BrowserRouter, Route, Routes } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Parts from "./pages/Parts";
import NotFound from "./pages/NotFound";

// components
import Middleware from "./components/Middleware";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/parts"
          element={
            <Middleware>
              <Parts />
            </Middleware>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
