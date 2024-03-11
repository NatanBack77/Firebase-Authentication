import express from "express";
import "dotenv/config";
import admin, { auth } from "firebase-admin";

const app = express();
app.use(express.json());

// const Key = process.env.Key as string | admin.ServiceAccount;
admin.initializeApp({
	credential: admin.credential.cert("serviceAccountKey.json"),
	databaseURL: "https://test-ace4f-default-rtdb.firebaseio.com",
});

app.get("/transactions", async (req, res) => {
	console.log("GET of the aplication ");
	const jwt = req.headers.authorization;
	if (!jwt) {
		res.status(401).json({ msg: "usuário não autorizado" });
		return;
	}
	try {
		const decodedIDToken = await admin.auth().verifyIdToken(jwt, true);

		admin
			.firestore()
			.collection("transactions")
			.where("user.uid", "==", decodedIDToken.sub)
			.orderBy("date", "desc")
			.get()
			.then((snapshot) => {
				const transactions = snapshot.docs.map((doc) => ({
					...doc.data,
					uid: doc.id,
				}));
				res.json(transactions);
			});
	} catch (error) {
		res.status(401).json({ msg: "usuário não autorizado" });
		return;
	}
});

app.listen(3000);
