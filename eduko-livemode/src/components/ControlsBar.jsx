import React, { useState } from 'react';

export default function ControlsBar({ onStart }){
  const [text, setText] = useState('');
  return (
    <>
      <div style={{display:'flex', gap:8}}>
        <button className="btn" onClick={onStart}>Start Live Mode</button>
        <button className="btn secondary">Replay</button>
      </div>

      <div className="controls" style={{marginTop:12}}>
        <input className="input" placeholder="Type a doubt or question..." value={text} onChange={e=>setText(e.target.value)} />
        <button className="btn secondary" onClick={()=>{ if(text) { alert('Doubt sent: '+text); setText(''); } }}>Send</button>
      </div>
    </>
  );
}
