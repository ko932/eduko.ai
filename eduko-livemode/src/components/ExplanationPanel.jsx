import React from 'react';

export default function ExplanationPanel(){
  return (
    <div className="explanation">
      <h3>Explanation Panel</h3>
      <p>
        This panel shows the dynamic explanation: text, diagrams, equations and small step-by-step guidance from the 3D tutor.
        In this demo the content is static — when integrated with the LLM orchestrator the panel updates in real-time.
      </p>

      <h4 style={{marginTop:12}}>Last Interaction</h4>
      <p className="small">No interactions yet. Start the live session to see transcripts and annotations here.</p>
    </div>
  );
}
