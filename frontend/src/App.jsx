import { useState, useEffect } from "react";
import "./App.css";
import AgentChat from "./components/AgentChat";
import Login from "./components/Login";
import UserChat from "./components/UserChat";

function App() {
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let storedUser = window.sessionStorage.getItem("id");
    let storedUserType = window.sessionStorage.getItem("userType");
    setUserId(storedUser);
    setUserType(storedUserType);
  }, []);
  console.log(userId);
  console.log(userType);
  return (
    <div className="App">
      {(!userId && <Login setUser={setUserId} setUserType={setUserType} />) ||
        (userType == "user" ? (
          <UserChat
            user={userId}
            userType={userType}
            setUser={setUserId}
            setUserType={setUserType}
          />
        ) : (
          <AgentChat
            user={userId}
            userType={userType}
            setUser={setUserId}
            setUserType={setUserType}
          />
        ))}
    </div>
  );
}

export default App;
