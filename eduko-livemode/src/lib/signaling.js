// Minimal client signalling integration using socket.io + simple-peer.
// This file creates a local peer and signals via socket to a server.
// For demo this expects a signalling server at VITE_SIGNALLING_SERVER_URL that forwards sdp/ice messages.

import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

let socket = null;
const serverUrl = import.meta.env.VITE_SIGNALLING_SERVER_URL || 'http://localhost:4000';
const localStreams = {};

export function initSignalling(sessionId, onEvent = ()=>{}){
  socket = io(serverUrl, { transports:['websocket'] });

  socket.on('connect', ()=> {
    socket.emit('join-session', { sessionId });
    onEvent('connected');
  });

  socket.on('signal', (data) => {
    // data: { from, to, type, payload }
    // For a simple demo we just pass this to consumer via window event
    window.dispatchEvent(new CustomEvent('remote-signal', { detail: data }));
  });

  socket.on('disconnect', ()=> onEvent('disconnected'));
  return socket;
}

export async function createLocalPeer(sessionId, { onStream, onConnected } = {}){
  if(!socket) throw new Error('Signalling socket not initialized. Call initSignalling first.');

  // get user microphone (demo); in production handle permissions & fallback
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

  const peer = new SimplePeer({ initiator:true, trickle:true, stream });

  peer.on('signal', (data) => {
    socket.emit('signal', { sessionId, payload: data });
  });

  peer.on('connect', () => {
    onConnected && onConnected();
  });

  peer.on('stream', (remoteStream) => {
    onStream && onStream(remoteStream);
  });

  // listen for remote signals from signalling server
  window.addEventListener('remote-signal', (ev) => {
    const d = ev.detail;
    if(!d || !d.payload) return;
    try {
      peer.signal(d.payload);
    } catch (e) {
      console.warn('signal error', e);
    }
  });

  return peer;
}
