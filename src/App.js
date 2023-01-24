import './app.css';
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import Single from "./pages/Single";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="assets/:id" element={<Single />} />
                    <Route path="404" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
