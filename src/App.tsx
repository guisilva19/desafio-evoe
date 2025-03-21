import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie"; // Importar o CookiesProvider
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <Router>
        <Toaster position="top-right" />
          <Routes>
            <Route path="/" index element={<SignIn />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<h1>Área Protegida</h1>} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
