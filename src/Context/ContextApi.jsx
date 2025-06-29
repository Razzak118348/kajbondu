import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import app from "../Firebase/firebase.config";
import { useEffect, useState, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const ContextApi = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ New state to hold all service data
  const [serviceContent, setServiceContent] = useState([]);

  // 🔄 Fetch services once at app load
  useEffect(() => {
    axios
      .get("http://localhost:3000/services") // your backend endpoint
      .then(res => setServiceContent(res.data))
      .catch(err => console.error("Service fetch error:", err));
  }, []);

  // create user
  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in
  const SignInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const gitHubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  // ✅ Combine all data in one context object
  const authInfo = {
    user,
    creatUser,
    SignInUser,
    LogOut,
    loading,
    googleLogin,
    gitHubLogin,
    serviceContent // ✅ make services available globally
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextApi;
