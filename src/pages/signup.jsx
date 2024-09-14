
// ________________________________
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router';


function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (password !== confirmpassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // alert("User signed up successfully!");

            // Clear input fields after successful sign up
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setFirstname("");
            setLastname("");

            navigate('/') //if user signup successfully it show product page
            
        } catch (error) {
            setError(error.message);
            alert(error.message)
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center px-6 py-2 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-orange-400 text-2xl font-bold leading-9 tracking-tight">
                    Create Account
                </h2>
            </div>

            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label 
                            htmlFor="email" 
                            className="block text-sm font-medium leading-6 text-orange-600"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input 
                                placeholder='Email'
                                id="email" 
                                name="email" 
                                type="email" 
                                autoComplete="email" 
                                required 
                                value={email}
                                onChange={(userEmail) => setEmail(userEmail.target.value)}
                                className="text-center font-bold block w-full rounded-md border-0 py-1.5 text-orange-600 shadow-sm ring-1 ring-inset ring-orange-400 placeholder:text-orange-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                            />
                        </div>                        
                    </div>

                    <div>
                        <div className="mt-3 flex items-center justify-between">
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium leading-6 text-orange-600"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2 text-orange-600">
                            <input 
                                placeholder='password'
                                id="password" 
                                name="password" 
                                type="password" 
                                // autoComplete="current-password" 
                                required 
                                value={password}
                                onChange={(userPasword) => setPassword(userPasword.target.value)}
                                className="text-center font-bold block w-full rounded-md py-1.5 text-orange-600 ring-1 ring-inset ring-orange-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <div className="mt-3 flex items-center justify-between">
                            <label 
                                htmlFor="confirmpassword" 
                                className="block text-sm font-medium leading-6 text-orange-600"
                            >
                                Confirm Password
                            </label>
                        </div>
                        <div className="mt-2 text-orange-600">
                            <input 
                                placeholder='Confirm Password'
                                id="confirmpassword" 
                                name="confirmpassword" 
                                type="password" 
                                autoComplete="current-password" 
                                required 
                                value={confirmpassword}
                                onChange={(userConfirmPasword) => setConfirmPassword(userConfirmPasword.target.value)}
                                className="text-center font-bold block w-full rounded-md py-1.5 text-orange-600 ring-1 ring-inset ring-orange-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="mt-3 flex items-center justify-between">
                            <label 
                                htmlFor="firstname" 
                                className="block text-sm font-medium leading-6 text-orange-600"
                            >
                                First Name
                            </label>
                        </div>
                        <div className="mt-2 text-orange-600">
                            <input 
                                placeholder='First Name'
                                id="firstname" 
                                name="firstname" 
                                type="text" 
                                required 
                                value={firstname}
                                onChange={(userFirstName) => setFirstname(userFirstName.target.value)}
                                className="text-center font-bold block w-full rounded-md py-1.5 text-orange-600 ring-1 ring-inset ring-orange-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="mt-3 flex items-center justify-between">
                            <label 
                                htmlFor="lastname" 
                                className="block text-sm font-medium leading-6 text-orange-600"
                            >
                                Last Name
                            </label>
                        </div>
                        <div className="mt-2 text-orange-600">
                            <input 
                                placeholder='Last Name'
                                id="lastname" 
                                name="lastname" 
                                type="text" 
                                required 
                                value={lastname}
                                onChange={(userLastName) => setLastname(userLastName.target.value)}
                                className="text-center font-bold block w-full rounded-md py-1.5 text-orange-600 ring-1 ring-inset ring-orange-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button 
                            type="submit" 
                            className="mt-5 flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500"
                            disabled={loading}
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;


