import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { userLogin } from '../../features/User/userSlice';
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import './Login.scss';
import Error from '../../Error';

const Login = () => {
    const { loading, userInfo, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    useEffect(()=>{
        if(userInfo.id){
            navigate('/user-profile')
        }
    },[navigate,userInfo])

    const submitHandler = (data) => {
         dispatch(userLogin(data))
    }


    return (
    <div className='login'>
        <div className="container mt-5">
            <h1>Login</h1>
            <div className="row">
            <div className="col-sm-8">
            <div className="card">
            <div className="card-body">
                <form action="/login" onSubmit={handleSubmit(submitHandler)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name="email" 
                            {...register('email')}
                            id="email"
                            required
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password" 
                            id='password'    
                            {...register('password')}
                            required
                        />
                    </div>
                    {error && <Error>{error}</Error>}
                    <button type="submit" className="btn btn-dark login-btn"
                            disabled={loading}
                    >Login</button>
                    <Link to='/register'>
                    <button  className="btn btn-dark register-btn">Signup</button>
                    </Link>
                </form>
            </div>
            </div>
            </div>
            </div>
        </div>
    </div>
    );
};

export default Login;