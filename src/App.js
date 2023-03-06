import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import "./styles.css"
import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";



function App() {

  const {currentUser} = useContext(AuthContext);
  
  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login/" />
    }
  }

  return (
   

    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={currentUser ? <Homepage />: <Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

      </Routes>

    </BrowserRouter>
  
    
  );
}

export default App;
