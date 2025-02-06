import { useState, useEffect } from 'react'
import { Toast } from '../utils/sweetAlert';
import axios from 'axios';
import PropTypes from 'prop-types'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style.scss'
import logoAdmin from '../assets/img/admin/logoAdmin.svg'

const { VITE_BASE_URL: baseURL } = import.meta.env;

function LoginPage ({ setIsAuth }) {

    const [accountData, setAccountData] = useState({username: '' , password: ''}) //暫存登入資訊

    //未登入：處理登入input value
    const handleAccountInputChange = (e) => {
        let {id, value} = e.target;
        setAccountData( prevData => ({
        ...prevData,
        [id]: value
        }))
    }

    //驗證登入狀態:儲存token
    useEffect(() => {
        const token = document.cookie.replace(/(?:^|;\s*)apiToken\s*=\s*([^;]*).*$|^.*$/,"$1"); 
        if (token) {
        axios.defaults.headers.common['Authorization'] = token;
        checkLogin();
        } else {
        setIsAuth(false);
        }
    }, []);
    //驗證登入狀態
    const checkLogin = async () => {
        try {
        await axios.post(`${baseURL}/api/user/check`)
        setIsAuth(true);
        } catch (error) {
        Toast.fire({
            icon: "error",
            title: "驗證失敗",
            text: error
        });
        }
    }

    //未登入：執行登入
    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post(`${baseURL}/admin/signin` , accountData)
        const {token, expired} = res.data;
        document.cookie = `apiToken=${token}; expires=${ new Date (expired)}`; 
        axios.defaults.headers.common['Authorization'] = token;

        Toast.fire({
            icon: "success",
            title: res.data.message,
            text: `登入帳號：${accountData.username}`
        });
        setIsAuth(true)
        setAccountData('')
        } catch (error) {
        Toast.fire({
            icon: "error",
            title: "登入失敗",
            text: error
        });
        }
    }

    return (
        <div className="container-fluid">
            <div className="row row-cols-2">
            <div className="col">
                <div className="AdminLogo">
                <img src={logoAdmin} alt="logo"/>
                </div>
            </div>
            <div className="col">
                <div className="login">
                <h1 className="h2 text-center  text-white">後台管理系統</h1>
                <p className="text-white ">創造專為毛孩打造的智能生活</p>
                <form className="loginForm">
                    <div className="form-floating mb-3">
                    <input 
                        type="email" 
                        className="form-control input" 
                        id="username" 
                        placeholder="name@example.com" 
                        onChange={(e) => {handleAccountInputChange(e)}}
                        required
                    />
                    <label htmlFor="username">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input 
                        type="password" 
                        className="form-control input" 
                        id="password" 
                        placeholder="Password" 
                        onChange={(e) => {handleAccountInputChange(e)}}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit" className="btn btn-lg btn-primary  w-100" onClick={ (e) => loginSubmit(e)}>登入</button>
                </form>
                </div>
            </div>
            </div>
        </div>
    )
}
export default LoginPage;

LoginPage.propTypes = {
    setIsAuth: PropTypes.func.isRequired
}