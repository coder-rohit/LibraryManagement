import { Row, Col } from "react-bootstrap";
import style from '../../moduleCSS/Login.module.css'
import loginOverlayImage from '../../images/loginOverlay.png'
//react icons
import { IconContext } from "react-icons";
import { FaGooglePlusSquare, FaFacebookSquare } from 'react-icons/fa';
// import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'animate.css';
import { useCookies } from 'react-cookie'
 
export default function Login() {

    const [cookie, setCookie] = useCookies(['username']);

    const navigate = useNavigate();

    useEffect(() => {
        cookie.username !== "undefined" && navigate("/admin", { replace: true });
    },)
    
    const [creds, setCreds] = useState({ username: "", password: "" })

    const handleCredInputs = (e) => {
        let name = e.target.name
        let value = e.target.value
        setCreds({ ...creds, [name]: value })
    }

    const checkCreds = async (e) => {
        e.preventDefault()
        const userAPIURL = "http://localhost:8001/users"
        const data = creds

        axios
            .post(userAPIURL, data, {
                header: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                },
            })
            .then(({ data }) => {
                (data === true) ? setCookie('username', creds.username, [{path: '/', maxAge : 1000}]) : wrongPassword()
            })
            .catch(function(error){
                console.log(error.message)
                alert("Cannot Connect to Database, Check your internet ")
            })
    }

    const LoginButton = useRef(null)
    const loginDiv = useRef(null)
    const wrongPassword = () => {
        LoginButton.current.innerHTML = "Wrong Username or Password"
        LoginButton.current.style.backgroundColor = "red"
        LoginButton.current.classList.add('animate__animated', 'animate__wobble')
        setTimeout(() => {
            LoginButton.current.classList.remove('animate__wobble')
        }, 1000);
        setTimeout(() => {
            LoginButton.current.innerHTML = "Login"
            LoginButton.current.style.backgroundColor = "#FFBC53"
        }, 2000);
    }

    return (
        <>
            <div ref={loginDiv} className={style.Loginbox}>
                <Row>
                    <Col className={style.imageContainer}>
                        <img src={loginOverlayImage} alt="loginOverlay" />
                    </Col>
                    <Col className={style.formContainer}>
                        <div className={style.InnerContainer}>
                            <h4 className="mt-5">Login</h4>
                            <h6>Access to our dashboard</h6>
                            <form className={style.loginForm}>
                                <input type="text" value={creds.username} onChange={handleCredInputs} autoComplete="username" name="username" placeholder="Email or Phone Number" />
                                <br />
                                <input type="password" value={creds.password} onChange={handleCredInputs} autoComplete="current-password" name="password" placeholder="Password" />
                                <br />
                                <button ref={LoginButton} onClick={checkCreds}>Login</button>
                                <p className={style.forgetPassword}>Forget Password?</p>
                            </form>
                            <div className={style.orBox}>
                                <span className={style.orLine}></span>
                                <span className={style.Or}>OR</span>
                            </div>
                            <div className={style.loginWith}>
                                <p>Login with</p>
                                <IconContext.Provider value={{ color: "#4B75BD", size: "34px" }}>
                                    <span className={style.LoginFromFacebookIcon}><FaFacebookSquare /></span>
                                </IconContext.Provider>
                                <IconContext.Provider value={{ color: "#FE5240", size: "34px", style: {} }}>
                                    <span className={style.LoginFromGoogleIcon}><FaGooglePlusSquare /></span>
                                </IconContext.Provider>
                            </div>
                            <div className={style.registerNew}>
                                <p>Don't have an account? <span><a href="/" style={{ color: "#000", textDecoration: "none" }}>Register</a></span></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}