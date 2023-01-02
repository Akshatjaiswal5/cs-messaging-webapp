import { useState, useEffect } from "react";
import "./App.css";
import AgentChat from "./components/AgentChat";
import Login from "./components/Login";
import UserChat from "./components/UserChat";

function App() {
  const [userType, setUserType] = useState({});
  const [userId, setUserId] = useState({});

  useEffect(() => {
    let storedUser = JSON.parse(window.sessionStorage.getItem("user")) ?? {};
    let storedUserType = window.sessionStorage.getItem("userType");
    setUserId(storedUser);
    setUserType(storedUserType);
  }, []);

  return (
    <div className="App">
      {(Object.keys(userId).length === 0 && (
        <Login setUser={setUserId} setUserType={setUserType} />
      )) ||
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
