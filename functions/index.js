const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const { Storage } = require('@google-cloud/storage');

admin.initializeApp();
const db = admin.firestore();
const storage = new Storage(); // uses GOOGLE_APPLICATION_CREDENTIALS or default service account

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

/**
 * POST /getSignedUrl
 * Body: { sessionId: string, filePath: string }
 * Header: Authorization: Bearer <Firebase ID Token>
 */
app.post('/getSignedUrl', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split('Bearer ')[1];
    if (!token) return res.status(401).json({ error: 'Missing auth token' });

    // Verify Firebase ID token
    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    const { sessionId, filePath } = req.body || {};
    if (!sessionId || !filePath) return res.status(400).json({ error: 'sessionId and filePath required' });

    // Load session doc
    const sessRef = db.collection('sessions').doc(sessionId);
    const sessSnap = await sessRef.get();
    if (!sessSnap.exists) return res.status(404).json({ error: 'session not found' });
    const session = sessSnap.data();

    // Admins bypass
    if (decoded.admin === true) {
      // proceed
    } else {
      // check membership
      const participants = Array.isArray(session.participants) ? session.participants : [];
      if (session.ownerUid !== uid && !participants.includes(uid)) {
        return res.status(403).json({ error: 'Not a session participant' });
      }
    }

    // Build signed URL
    // filePath should be the full Storage path e.g. "session-recordings/sess-abc/rec1.wav"
    const bucketName = process.env.FIREBASE_STORAGE_BUCKET || admin.storage().bucket().name;
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filePath);

    // Check file exists
    const [exists] = await file.exists();
    if (!exists) return res.status(404).json({ error: 'file not found' });

    // Generate signed url (GET) valid for 10 minutes
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    return res.json({ ok: true, url });

  } catch (err) {
    console.error('getSignedUrl error', err);
    if (err.code === 'auth/argument-error' || err.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    return res.status(500).json({ error: err.message || 'internal error' });
  }
});

// Export as a single HTTP function
exports.api = functions.https.onRequest(app);
