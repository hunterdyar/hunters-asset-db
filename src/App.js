import './app.css';
import Home from "./pages/Home";
import {HashRouter, Route, Routes} from "react-router-dom";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import Single from "./pages/Single";
import About from "./pages/About";
import Test from "./pages/Test";

function App() {
  return (
    <div className="App">
        <HashRouter >
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="assets/:id" element={<Single />} />
                    <Route path="about" element={<About />} />
                    <Route path="404" element={<NoPage />} />
                    <Route path="test" element={<Test />} />
                </Route>
            </Routes>
        </HashRouter >
    </div>
  );
}

export default App;
