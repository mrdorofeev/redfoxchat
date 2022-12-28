import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";


const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };


  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      
      //console.log(result)
      
      //setDoc(doc(db, "userChats", result.user.uid), {});
      
      /*setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        downloadURL: result.user.photoURL,
      });*/

      navigate("/");
    })
    .catch((error) => {
      alert("Не получилось авторизоваться через Google")
    })
  }



  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">RedFox Chat</span>
        <span className="title">Вход</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Пароль" />
          <button>Войти</button>
          {err && <span>Ой, что-то пошло не так</span>}
        </form>
        <button onClick={signInWithGoogle} type="button" className="login-with-google-btn" >
          Войти с Google
        </button>
        <p>Впервые на сайте? <Link to="/register">Зарегистрироваться</Link></p>      
      </div>

    </div>
  );
};

export default Login;
