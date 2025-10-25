import React, { useState, useEffect } from "react";
import "./SignIn.css";
// import email_icon from "../../Assets/email_login.png";
// import password_icon from "../../Assets/lock_login.png";
// import eye_icon from "../../Assets/eye_login.png";
// import non_seen_eye_icon from "../../Assets/eyeclose_login.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const token = localStorage.getItem("token");

  const [packagetype, setpackagetype] = useState("");

  const [sessionId, setSessionId] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  localStorage.setItem("adminemail", email);
  localStorage.setItem("adminpass", password);
  console.log(packagetype, "     get the package name before login function");

  useEffect(() => {
    return () => {
      setpackagetype(localStorage.getItem("paymentmethod"));
    };
  }, [email, password]);

  const [adminemail, setadminemail] = useState("");
  const [adminpass, setadminpass] = useState("");
  useEffect(() => {
    setadminemail(localStorage.getItem("adminemail"));
    setadminpass(localStorage.getItem("adminpass"));
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Set loading to true when the form is being submitted
    setLoading(true);

    const payload = {
      email: email,
      password: password,
    };

    try {
      if (
        email === "admin@asiasuperyacht.com" &&
        password === "Password12@"
      ) {
        const token = "abcdefghijklmnopqrstuvwxyz";
        localStorage.setItem("token", token);
        navigate("/add-home");
        setEmail("");
        setPassword("");
      } else {
        alert("invalid email or password");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setLoading(false);
      console.log("login error", error);
      setNotificationMessage(error?.response?.data?.error);
      setTimeout(() => {
        setNotificationMessage("");
      }, 4000);
    } finally {
      setLoading(false);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleClick = async (namepackage) => {
    const token = localStorage.getItem("token");
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });
  };

  return (
    <div>
      <div className="service_back">
        {/* <div className="list_building pt-4">Sign In</div> */}
      </div>
      <div className="container">
        <div className="main_div_signin">
          <div className="row">
            <div className="col-lg-2 col-md-12 col-12"></div>
            <div className="col-lg-8 col-md-12 col-12">
              <div className="main_div_form_signin">
                <div className="form_main_div_sign_in">
                  <form onSubmit={handleLogin}>
                    <div className="padding_div_form_signin">
                      <p className="heading_in_form_sign_in">Login</p>

                      <div className="input_style_firstname_signin mt-5">
                        <div className="d-flex flex-row">
                          {/* <img
                            src="{email_icon}"
                            className=""
                            alt="signininputlogo"
                          /> */}
                          <input
                            className="input_firstname_style_signin"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                          />
                        </div>
                      </div>

                      <div className="input_style_firstname_signin mt-5">
                        <div className="d-flex flex-row">
                         {/* <img
                            src="{password_icon}"
                            className=""
                            alt="signininputlogo"
                          />  */}
                          <input
                            type={passwordVisible ? "text" : "password"}
                            className="input_firstname_style_signin"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <img
                            src="{passwordVisible ? non_seen_eye_icon : eye_icon}"
                            className="eye_style_signin"
                            onClick={handleTogglePassword}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row-reverse"></div>
                    </div>

                    <div className="main_div_buttons_signin mt-5">
                      <button
                        className="orange_button_signin"
                        type="submit"
                        disabled={loading}
                      >
                        Login
                        {/* {loading ? <Loader/> : "Login"} */}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 col-12"></div>
          </div>
        </div>

        {/* {loadingforpayment ? <Loader /> : null} */}
      </div>
    </div>
  );
}

export default SignIn;
