import './styles/main.css';
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import Chatbot from "./components/Chatbot";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className='App'>
      <NavBar />
      <div className="container">
        {!user ? <Welcome /> : <Chatbot />}
      </div>
    </div>
  );
}

export default App;
