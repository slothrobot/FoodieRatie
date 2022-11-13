import React, {useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.scss';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import { registerUser } from '../../features/User/userSlice';
import Error from '../../Error';

const Register = () => {
    const {loading, userInfo, error, success} = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const navigate = useNavigate();

    useEffect(()=>{
        if(success) navigate('/login')
        if(userInfo.id) navigate('/')
    },[navigate, userInfo, success]);

    const submitHandler = (e) =>{
        if(e.password !== e.confirmPassword){
            alert('Password Mismatch')
            return
        }
        dispatch(registerUser(e))
    }

    return (
        <div className='register'>
            <div className="container mt-5">
            <h1>Signup</h1>
            <div className="row">
            <div className="col-sm-8">
            <div className="card">
            <div className="card-body">
                <form action="/register" onSubmit={handleSubmit(submitHandler)}>
                <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="username" 
                            id="username"
                            {...register('username')}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name="email" 
                            id="email"
                            {...register('email')}
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
                      <small id="pwHelp" className="form-text text-muted">Please enter at least 6 characters.</small>

                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password" 
                            id='password'    
                            {...register('confirmPassword')}
                            required
                        />
                    </div>
                    {error && <Error>{error}</Error>}
                    <button type="submit" className="btn btn-dark"
                            disabled={loading}
                    >Register</button>
                    <Link to='/login'>
                    <button  className="btn btn-dark">Login</button>
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

export default Register;