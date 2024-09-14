import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [currentUser_Email, setcurrentUser_Email] = useState(" ");
  const [currentUser_password, setcurrentUser_password] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handel_Signin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    signInWithEmailAndPassword(auth, currentUser_Email, currentUser_password)
      .then((userCredential) => {
        // alert("Sign in successful!");

        // Clear input fields after successful sign in
        setcurrentUser_Email("");
        setcurrentUser_password("");

        //if user login successfully it move to product page
        navigate("/");

        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        setLoading(false);
      });
  };

  // signin with Gmail
  const handelSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result ", result);

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user", user);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log("error", error.code);
        const errorMessage = error.message;
        console.log("error", error.message);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="flex flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img 
                    className="mx-auto h-10 w-auto" 
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" 
                    alt="Your Company" 
                /> */}
        <h2 className="mt-10 text-center text-orange-400 text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <form className="space-y-6" action="#" method="POST"> */}
        <form className="space-y-6" onSubmit={handel_Signin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-orange-600"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(currentUserEmail) =>
                  setcurrentUser_Email(currentUserEmail.target.value)
                }
                className="block w-full rounded-md border-0 py-1.5 text-orange-600 shadow-sm ring-1 ring-inset ring-orange-400 placeholder:text-orange-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-orange-600"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="text-orange-500 font-semibold hover:text-orange-600"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2 text-orange-600">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(currentUserPasword) =>
                  setcurrentUser_password(currentUserPasword.target.value)
                }
                className="block  w-full rounded-md  py-1.5 text-orange-600 ring-1 ring-inset ring-orange-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            {/* sign in with email and password */}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div>
            {/* sign in with Gmail */}
            <button
              onClick={handelSignInWithGoogle}
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 "
            > Signin With Google </button>
          </div>

        </form>
     </div>
    </div>
  );
}

export default SignIn;
