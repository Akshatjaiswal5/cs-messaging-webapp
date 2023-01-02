import { useState } from "react";

const Login = ({ setUser, setUserType }) => {
  const [enteredUser, setEnteredUser] = useState("");
  const [enteredUserType, setEnteredUserType] = useState("user");
  return (
    <div className="Login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUser(enteredUser);
          setUserType(enteredUserType);
        }}
      >
        <div className="form-element">
          <label>UserType</label>
          <select
            className="input"
            onChange={(e) => {
              setEnteredUserType(e.target.value);
            }}
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
          </select>
        </div>
        <div className="form-element">
          <label>UserId</label>
          <input
            className="input"
            type="number"
            value={enteredUser}
            onChange={(e) => setEnteredUser(e.target.value)}
          />
        </div>
        <div className="form-element">
          <button className="submit" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
