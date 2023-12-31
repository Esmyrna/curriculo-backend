import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { firebase } from '../server';
import dotenv from 'dotenv';

dotenv.config()

admin.initializeApp({
  credential: admin.credential.cert({  
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN} as admin.ServiceAccount),
});

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = auth.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.body.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Forbidden' });
  }
}

export async function isUserAdmin(req: Request, res: Response, next: NextFunction) {
  const uid = req.body.user.uid
  const db = getFirestore(firebase);
  const usersCollection = collection(db, "users");
  const fetchQuery = query(usersCollection, where("uid", "==", uid), where("isMain", "==", true));

  try {
    const querySnapshot = await getDocs(fetchQuery);

    if (querySnapshot.size > 0) {
      next();
    } 
    else {
      return res.status(403).json({ error: 'Permissão negada' });
    }
  } 
  catch (error) {
    console.error("Erro ao verificar permissão de administrador:", error);
    return res.status(403).json({ error: 'Forbidden' });
  }
}

export async function loginAdmin() {
  const auth = getAuth();
  const email = "admin.test@email.com";
  const password = "12345678";

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return await user.getIdToken();
  }
  catch (error) {
    console.error("Erro de login:", error);
    throw error;
  }
}

export async function loginDefaultUser() {
  const auth = getAuth();
  const email = "regularuser.test@email.com";
  const password = "12345678";

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return await user.getIdToken();
  }
  catch (error) {
    console.error("Erro de login:", error);
    throw error;
  }
}
