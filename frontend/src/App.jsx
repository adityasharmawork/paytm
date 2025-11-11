import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup"
import Signin from "./components/Signin";
import Appbar from "./components/Appbar";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard" element={<Appbar />} />
          {/* <Route path=  "/send" element={<SendMoney />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
