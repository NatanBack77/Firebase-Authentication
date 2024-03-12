import express from "express";
import {
	getAuth,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	getIdToken,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { app } from "firebase-admin";

const firebaseConfig = {
	apiKey: "AIzaSyC4UT8VY4gHio4q5N2i5bdNAQLcdJ8V0kQ",
	authDomain: "test-ace4f.firebaseapp.com",
	databaseURL: "https://test-ace4f-default-rtdb.firebaseio.com",
	projectId: "test-ace4f",
	storageBucket: "test-ace4f.appspot.com",
	messagingSenderId: "1026816016824",
	appId: "1:1026816016824:web:6d70b9d81441bafffd8f4d",
	measurementId: "G-FK0YJLM4YN",
};

const exp = express();
exp.use(express.json());
exp.post("/", (req, res) => {
	const { email, password } = req.body;
	const user = {
		email,
		password,
	};
	const app = initializeApp(firebaseConfig);
	const auth = getAuth();
	createUserWithEmailAndPassword(auth, user.email, user.password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			console.log(user);
      const token = getIdToken(user).then((token) => {
        console.log(token);
      });
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});
    
});

exp.get("/", (req, res) => {
   
});
exp.listen(3000);
