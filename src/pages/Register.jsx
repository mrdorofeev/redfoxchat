import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, db, storage, provider } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault(); //берём значения из полей
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //создание пользователя
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //создание уникального имени изображения
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //обновление профиля
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //создание пользователя в firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //создание пустого чата в firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };


  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      alert("Не получилось авторизоваться через Google")
    })
  }



  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">RedFox Chat</span>
        <span className="title">Регистрация</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Отображаемое имя" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Пароль" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Добавить аватарку</span>
          </label>
          <button disabled={loading}>Зарегистрироваться</button>
          {loading && "Загрузка изображения..."}
          {err && <span>Ой, что-то пошло не так</span>}
        </form>
        
        <p>
          Уже зарегистрированы? <Link to="/Login">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
