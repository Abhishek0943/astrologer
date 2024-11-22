import styles from './LoginForm.module.css';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import { ForgetPass, GetCategory, LoginUser, PopupState, SinginUser, VerifyEmail, resetPassword } from '../../../api/userLogInReducer';
import Loading from '../../Component/Loading/Loading';
import { checkDateRange } from '../Profile/ProfileSideBar';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import model from "../../Component/Model/Model.module.css"
import { OnLoginEmit } from '../../../socket';
import GetDate from '../../GetDate/GetDate';
function Auth() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const l = queryParams.get('login');//login page
	const s = queryParams.get('sign-up'); // register page
	const f = queryParams.get('forgot-password'); // forgot page 
	// const r = queryParams.get('reset-password'); // 
	const t = queryParams.get('token'); // token value
	const p = queryParams.get('p');
	const dispatch = useDispatch()
	const [loginForm, setLoginForm] = useState("sinup")
	const { user } = useSelector((state) => state.userLog)
	const navigate = useNavigate()
	const formClass = loginForm === 'login' ? styles.login : loginForm === 'forgotPassword' ? styles.forgotPassword : loginForm === 'verify' ? styles.verify : styles.signup;
	useEffect(() => {
		if (s === 'true') {
			setLoginForm('singUp');
		} else if (l === 'true') {
			setLoginForm('login');
		} else if (f === 'true') {
			setLoginForm('forgotPassword');
		}
	}, [l, s, f]);
	if (user?._id) {
		return (
			<Navigate to={`/`} />
		)
	}
	return (
		<>

			<div className={`${styles.mostOuter} `}  >

				<div className={`${styles.right} `}>
					<div className={`${styles.wrapper} ${formClass}`} id="wrapper">
						<div>
							<SingPage setLoginForm={setLoginForm} />
							<LoginPage setLoginForm={setLoginForm} />
							<ForgotPassword setLoginForm={setLoginForm} />
							{/* <VerifyPage setLoginForm={setLoginForm} /> */}
						</div>
					</div>
					<div className={styles.text}>
						<div>
							<span onClick={() => navigate("/Privacy-policy")}>Privacy Policy</span> .
							<span onClick={() => navigate("/term&condition")}>Term & Condition</span> .
							<span onClick={() => navigate("/contact-us")}>Contact us</span>
						</div>
						<p>Developed by <a href="" target='_blank'>Abhishek</a> </p>
					</div>
				</div>
				<div className={`${styles.left}`} style={{ display: "flex", alignItems: "start", justifyContent: "flex-start" , position:"relative" }}>
					<div style={{position: "absolute",top:"0px",zIndex: "0" ,left:"0px", height:"100%" , width:"100%" , background:"linear-gradient(142deg, rgba(0,0,0,1) 20%, rgba(0,0,0,.2) 100%)" ,}}></div>
					<div className={`${styles.test}`} style={{ maxWidth:"800px", position:"relative", zIndex: "1", }}>
						<h4>Welcome to Our Astrology Platform</h4>
						<ul>
							<li>Unlock the secrets of your future with expert guidance. Our astrologers are here to provide insights into your life's most important questions.</li>
							<li>Explore personalized horoscopes, cosmic alignments, and astrological solutions designed just for you.</li>
							<li>Join our community and experience a deeper connection to the stars, helping you make informed decisions with clarity.</li>
							<li>Your journey towards self-discovery and spiritual alignment begins here.</li>
						</ul>
					</div>

				</div>
			</div>
		</>
	);
}
const VerifyPage = ({ setLoginForm }) => {
	const [steps, setSteps] = useState(0)
	return (
		<>
			<div className={`${styles.form_box} ${styles.verify}`} >
				<form action="#">
					<h2>Verify</h2>
				</form>
			</div>
		</>
	)
}
const SingPage = ({ setLoginForm }) => {
	const [steps, setSteps] = useState(0)
	const [user, setUser] = useState({ dob: "", bt: "", bp: "", name: "", email: "", password: "",  })
	const [zodiac, setZodiac] = useState("")
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [term, setTerm] = useState(false)
	const navigate = useNavigate()
	const [error, setError] = useState("")
	const [categories, setCategories] = useState([])
	useEffect(() => {
		setError("")
	},[steps])
	useEffect(() => {
		dispatch(GetCategory()).then((e) => e.payload.success && setCategories(e.payload.categories))
	}, [])
	const InputRender = () => {
		switch (steps) {
			case 0:
				return (<>
					<GetDate setZodiac={setZodiac} setUser={setUser} user={user} />
					{
						zodiac &&
						<p style={{ marginBottom: "20px", fontWeight: "300" }}>According to your date of birth your zodiac sing is {zodiac}</p>
					}
					<button onClick={(e) => {
						e.preventDefault()
						setSteps(steps + 1)
					}} className={styles.btn}>Next</button>
					<div className={styles.login_register}>
						<p>Already have an account? <span style={{ cursor: "pointer" }} onClick={() => {
							setLoginForm('login')
							navigate("/auth?login=true")
						}} className="login-link" id="login-link">Login now</span></p>
					</div>
				</>
				)
				break;
			case 1:
				return (
					<>
						<div className={styles.input_box}>
							<input type="time" id="bt" value={user.bt} onChange={(e) => setUser({ ...user, "bt": e.target.value })} />
							<label htmlFor="bt">Birth Time</label>
						</div>
						<div className={styles.remember_password}>
							<label htmlFor=""> </label>
							<span style={{ cursor: "pointer" }} onClick={() => setSteps(steps + 1)} >Don't remember? Skip</span>
						</div>
						<button onClick={(e) => {
							e.preventDefault()
							setSteps(steps + 1)
						}} className={styles.btn}>Next</button>
						<div className={styles.login_register}>
							<p style={{ cursor: "pointer" }} onClick={() => setSteps(steps - 1)} >Previous Step</p>
						</div>
					</>
				)
				break;
			case 2:
				return (
					<>
						<div className={styles.input_box}>
							<span className={styles.icon}><ion-icon name="location"></ion-icon></span>
							<input type="text" id="bp" value={user.bp} onChange={(e) => setUser({ ...user, "bp": e.target.value })} />
							<label htmlFor="bp">Birth Place</label>
						</div>
						<button onClick={(e) => {
							e.preventDefault()
							setSteps(steps + 1)
						}} className={styles.btn}>Next</button>
						<div className={styles.login_register}>
							<p style={{ cursor: "pointer" }} onClick={() => setSteps(steps - 1)} >Previous Step</p>
						</div>
					</>
				)
				break;

			case 3:
				return (
					<>
						<div className={styles.input_box}>
							<span className={styles.icon}><ion-icon name="person"></ion-icon></span>
							<input type="text" id="name" value={user.name} onChange={(e) => setUser({ ...user, "name": e.target.value })} />
							<label htmlFor="name">Username*</label>
						</div>
						{
							error && <Error error={error} setError={setError} />
						}

						<button onClick={(e) => {
							e.preventDefault()
							if (user.name) {
								setSteps(steps + 1)
							}
							else {
								setError("Enter Your Valid Name")
							}
						}} className={styles.btn}>Next</button>
						<div className={styles.login_register}>
							<p style={{ cursor: "pointer" }} onClick={() => setSteps(steps - 1)} >Previous Step</p>
						</div>
					</>
				)
				break;
			case 4:
				return (
					<>
						<div className={styles.input_box}>
							<span className={styles.icon}><ion-icon name="mail"></ion-icon></span>
							<input type="email" name='email' value={user.email} id="email" onChange={(e) => setUser({ ...user, "email": e.target.value })} />
							<label htmlFor="email">Email*</label>
						</div>
						{
							error && <Error error={error} setError={setError} />
						}
						<button onClick={(e) => {
							e.preventDefault()
							let emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
							if (!emailRegex.test(user.email)) {
								setError("Enter Your Valid Email")
							}
							else {
								setSteps(steps + 1)
							}
						}} className={styles.btn}>Next</button>
						<div className={styles.login_register}>
							<p style={{ cursor: "pointer" }} onClick={() => setSteps(steps - 1)} >Previous Step</p>
						</div>
					</>
				)
				break;
			case 5:
				return (
					<>
						<div className={styles.input_box}>
							<span className={styles.icon}><ion-icon name="lock-closed"></ion-icon></span>
							<input autoComplete='off' value={user.password} type="password" name='password' id="password" onChange={(e) => setUser({ ...user, "password": e.target.value })} />
							<label htmlFor="password">Password*</label>
						</div>
						<div className={styles.remember_password}>
							<label htmlFor=""><input type="checkbox" checked={term} onChange={() => setTerm(!term)} />Agree to the term & condition </label>
						</div>
						{
							error && <Error error={error} setError={setError} />
						}
						<button onClick={(e) => {
							e.preventDefault()
							if (term) {
								setLoading(true)
								dispatch(SinginUser({ ...user, zodiac })).then((e) => {
									setLoading(false)
									if (e.payload?.success) {
										setSteps(steps + 1)
									} else {
										setError(e?.payload?.message || "Internal server error")
									}
								})
							} else {
								setError("You need to Check term & conditions ")
							}
						}} className={styles.btn}>{loading ? <Loading /> : "Submit"}</button>
						<div className={styles.login_register}>
							<p style={{ cursor: "pointer" }} onClick={() => setSteps(steps - 1)} >Previous Step</p>
						</div>
					</>
				)
				break;
			case 6:
				return (
					<>
						<div className={styles.login_register} style={{ border: "2px solid red", borderRadius: "7px", borderStyle: "dashed", marginBottom: "15px", padding: "10px" }}>
							<p style={{ textAlign: "left" }}>the verification email has been sent to your email id please check your email and enter the OTP below.</p>
						</div>
						<div className={styles.input_box} >
							<input autoComplete='off' type="text" value={user.otp} id="otp" onChange={(e) => setUser({ ...user, "otp": e.target.value })} />
							<label htmlFor="otp">OTP</label>
						</div>
						<button style={{ marginTop: "10px" }} onClick={(e) => {
							e.preventDefault()
							dispatch(VerifyEmail({ email: user.email, otp: user.otp })).then((e) => e.payload.success && navigate("/"))
						}} className={styles.btn}>Verify</button>
					</>
				)
				break;
		}
	}
	return (
		<>
			<div className={`${styles.form_box} ${styles.register}`} >
				<form action="#" autoComplete='off'>
					<h2>Register</h2>
					{
						InputRender()
					}
				</form>
			</div>
		</>
	)
}

const ForgotPassword = ({ setLoginForm }) => {
	const dispatch = useDispatch()
	const [user, setUser] = useState({ email: "", password: "", nPassword: "" })
	const [loading, setLoading] = useState(false)
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const t = queryParams.get('token'); // forgot page 
	const navigate = useNavigate()
	return (
		<>
			<div className={`${styles.form_box} ${styles.forgotPassword}`}>
				<h2>Forgot password</h2>
				<form action="#">
					{
						t ? <>
							<div className={styles.input_box}>
								<span className={styles.icon}><ion-icon name="lock-closed"></ion-icon></span>
								<input autoComplete='off' type="password" id='password' onChange={(e) => setUser({ ...user, "password": e.target.value })} />
								<label htmlFor="password">New Password</label>
							</div>
							<div className={styles.input_box}>
								<span className={styles.icon}><ion-icon name="lock-closed"></ion-icon></span>
								<input autoComplete='off' type="password" id='nPassword' onChange={(e) => setUser({ ...user, "nPassword": e.target.value })} />
								<label htmlFor="nPassword">Retype Password</label>
							</div>
							<button onClick={(e) => {
								e.preventDefault()
								setLoading(true)
								if (user.nPassword === user.password && user.password) {
									dispatch(ForgetPass({ p: user.password, t })).then((e) => {
										setLoading(false)
										if (e.payload.success) {
											navigate("/auth?login=true")
											dispatch(PopupState({ status: "Success", message: `Your password reset successfully` }))
										}
										else {
											dispatch(PopupState({ status: "Error", message: e.payload.message }))
										}
									})
								}
								else {
									dispatch(PopupState({ status: "Error", message: `Your password and retype ` }))
								}
							}} className={styles.btn}>{loading ? <Loading /> : "Reset password"}</button>
						</>
							: <>
								<div className={styles.input_box}>
									<span className={styles.icon}><ion-icon name="mail"></ion-icon></span>
									<input type="email" id='email' value={user.email} onChange={(e) => setUser({ ...user, "email": e.target.value })} />
									<label htmlFor="email">Email</label>
								</div>
								<div className={styles.remember_password}>
									<label htmlFor=""> </label>
									<span style={{ cursor: "pointer" }} onClick={() => setLoginForm("login")} >Back to Login</span>
								</div>
								<button onClick={(e) => {
									e.preventDefault()
									setLoading(true)
									if (user.nPassword === user.password) {
										dispatch(ForgetPass({ c: user.email })).then((e) => {
											setLoading(false)
											e.payload.success ? dispatch(PopupState({ status: "Success", message: `Reset password mail send successfully please check your mail` })) : dispatch(PopupState({ status: "Error", message: e.payload.message }))
										})
									}
									else {
										dispatch(PopupState({ status: "Error", message: `Your password and retype ` }))
									}
								}} className={styles.btn}>{loading ? <Loading /> : "Send Verification"}</button>

							</>
					}



				</form>
			</div >
		</>
	)
}
const LoginPage = ({ setLoginForm }) => {
	const dispatch = useDispatch()
	const [user, setUser] = useState({ email: "", password: "" })
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	return (
		<>
			<div className={`${styles.form_box} ${styles.login}`}>
				<h2>Login</h2>
				<form action="#">
					<div className={styles.input_box}>
						<span className={styles.icon}><ion-icon name="mail"></ion-icon></span>
						<input type="email" id='login-email' onChange={(e) => setUser({ ...user, "email": e.target.value })} />
						<label htmlFor="login-email">Email</label>
					</div>
					<div className={styles.input_box}>
						<span className={styles.icon}><ion-icon name="lock-closed"></ion-icon></span>
						<input autoComplete='off' type="password" id='login-password' onChange={(e) => setUser({ ...user, "password": e.target.value })} />
						<label htmlFor="login-password">Password</label>
					</div>
					<div className={styles.remember_password}>
						<label htmlFor=""> <input type="checkbox" />Remember me </label>
						{/* <span style={{ cursor: "pointer" }} onClick={() => {
							setLoginForm("forgotPassword")
							navigate("/auth?forgot-password=true")
						}} >Forgot Password</span> */}
					</div>
					<button onClick={(e) => {
						e.preventDefault()
						setLoading(true)
						dispatch(LoginUser({ c: user.email, p: user.password })).then((e) => {
							setLoading(false)
							if (e?.payload?.success) {
								// dispatch(PopupState({ status: "Success", message: "Login Successfully" }))
								dispatch(OnLoginEmit({ id: e.payload.user._id }))
								localStorage.setItem("token", e.payload.token)
							} else {
								dispatch(PopupState({ status: "Error", message: e.payload.message }))
							}
						})
					}} className={styles.btn}>{loading ? <Loading /> : "Login"}</button>
					<div className={styles.login_register}>
						<p>Don't have an account? <span style={{ cursor: "pointer" }} onClick={() => {
							setLoginForm("singUp")
							navigate("/auth?sign-up=true")
						}} className={styles.register_link} id="register-link">Register now</span></p>
					</div>
				</form>
			</div >
		</>
	)
}
const Error = ({ error }) => {
	return (
		<>
			<div className={styles.login_register}>
				<p style={{ cursor: "pointer", color: "var(--main-one)" }}  >{error}</p>
			</div>
		</>
	)
}
export default Auth;