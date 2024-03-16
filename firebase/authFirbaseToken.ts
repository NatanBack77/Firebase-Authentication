import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import express from "express";


const exp = express();

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

admin.initializeApp({
	credential: admin.credential.cert("../serviceAccountKey.json"),
});
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = admin.firestore();

exp.use(express.json());
exp.post("/users", (req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password,
	};

	createUserWithEmailAndPassword(auth, user.email, user.password)
		.then((userCredential) => {
			// Signed in
			db.collection("users").add(user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});
});

exp.get("/users", async (req, res) => {
	const users = db.collection("users");
	let user:any[]=[]
	const doc = await users.get().then(snapshot=>{
		snapshot.docs.forEach(doc=>{
		   user.push(doc.data())
		})
	})
	
	res.send(user)


	

	
});

exp.listen(3000);
