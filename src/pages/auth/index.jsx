import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase-config";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetUserInfo } from "./../../hooks/useGetUserInfo";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className=" mx-4 p-8  bg-gray-800 rounded-md shadow-lg text-white text-center">
        <p className="text-lg mb-4 font-bold">
          Welcome! Sign in with Google to get started.
        </p>
        <button
          onClick={signInWithGoogle}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
