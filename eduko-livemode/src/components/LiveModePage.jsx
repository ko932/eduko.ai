import React, { useEffect, useState } from 'react';
import ThreeTutorStage from './ThreeTutorStage';
import ExplanationPanel from './ExplanationPanel';
import ControlsBar from './ControlsBar';
import { initSignalling, createLocalPeer } from '../lib/signaling';

export default function LiveModePage(){
  const [sessionId, setSessionId] = useState(null);
  const [peer, setPeer] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(()=> {
    // auto-create a session id for demo
    const sid = 'demo-' + Math.random().toString(36).slice(2,9);
    setSessionId(sid);
    // initialize signalling (socket connect)
    initSignalling(sid, (ev)=> {
      // sample events: 'connected', 'remote-answer', 'peer-left'
      if(ev === 'connected') setStatus('signalling-connected');
    });
  },[]);

  async function startCall(){
    setStatus('starting');
    try {
      const localPeer = await createLocalPeer(sessionId, {
        onStream: ()=>{},
        onConnected: ()=> setStatus('connected')
      });
      setPeer(localPeer);
    } catch(e){
      console.error(e);
      setStatus('error');
    }
  }

  return (
    <div className="app-container">
      <div className="left-stage">
        <div className="overlay-annotation">Live Mode — Tutor: Mr. Vasu</div>
        <ThreeTutorStage peer={peer} />
      </div>

      <div className="right-panel">
        <ExplanationPanel />
        <div className="small">Session ID: {sessionId} • Status: {status}</div>
        <ControlsBar onStart={startCall} />
      </div>
    </div>
  );
}
