import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import APIService from "../services/APIService";
import styles from "./Login.module.css";

function Login() {
  const { login } = useUserContext();
  const [userInfos, setUserInfos] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedUserInfos = {
      email: userInfos.email,
      password: userInfos.password,
      roles: "admin",
    };
    try {
      const res = await APIService.post("/api/login", cleanedUserInfos);
      if (res && res.data && res.data.roles === "admin") {
        login(res.data);
        navigate("/admin/dashboard");
      } else navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (e) => {
    setUserInfos({
      ...userInfos,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className={styles["app-container"]}>
      <div className={styles["login-container"]}>
        <h1>Connectez-vous !</h1>
        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              placeholder="email"
              value={userInfos.email}
              onChange={handleChange}
              className="form-control"
              name="email"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password">Mot de passe:</label>
            <input
              type="password"
              placeholder="password"
              id="password"
              value={userInfos.password}
              onChange={handleChange}
              name="password"
            />
          </div>
          <div className={styles["button-container"]}>
            <button type="submit" className={styles.button}>
              Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
