// import { useEffect, useRef, useState } from 'react';
// import * as awarenessProtocol from 'y-protocols/awareness.js';
// import { HocuspocusProvider } from '@hocuspocus/provider';
// import * as Y from 'yjs';
import * as Y from 'yjs';

import { useParams } from "react-router-dom";
import { Doc1 } from "./components/doc1";
// import { Doc2 } from "./components/doc2";
import { HocuspocusProvider } from "@hocuspocus/provider";
import * as awarenessProtocol from 'y-protocols/awareness.js';

// const App = () => {
//   const [tasks, setTasks] = useState([]);
//   const [isHost, setIsHost] = useState(false);

//   const audioRef = useRef();

//   const handlePlay = () => {
//     handleAudio({
//       isPlaying: true,
//       timestamp: Date.now(),
//       playCursor: audioRef.current.currentTime,
//     });
//   };

//   const handlePause = () => {
//     handleAudio({
//       isPlaying: false,
//       timestamp: Date.now(),
//       playCursor: audioRef.current.currentTime,
//     });
//   };

//   useEffect(() => {
//     const awareness = new awarenessProtocol.Awareness(new Y.Doc());
//     const provider = new HocuspocusProvider({
//       url: 'ws://127.0.0.1:1234',
//       name: 'example-document',
//       awareness,
//       onAwarenessUpdate: (updates) => {
//         // …
//         // console.log({updates});
//       },
//       onAwarenessChange: (data) => {
//         // …
//         // console.log({data});
//       },
//     });

//     provider.setAwarenessField('user', {
//       name: 'Kevin Jahns',
//       color: '#ffcc00',
//       isHost,

//     });

//     awareness.on('update', ({ removed }) => {
//       console.log({ removed });
//     });

//     const states = awareness.getStates().entries()

//     console.log({states});

//     const yTasks = provider.document.getArray('tasks');
//     const updateTasks = () => {
//       const retrievedTasks = yTasks.toArray();
//       const sortedTasks = retrievedTasks.sort(
//         (a, b) => a.timestamp - b.timestamp
//       );
//       setTasks(sortedTasks);
//     };

//     // Listen for changes
//     yTasks.observe(updateTasks);

//     // Clean up the listener when the component unmounts
//     return () => {
//       yTasks.unobserve(updateTasks);
//     };
//   }, []);

//   const handleAudio = (audioState) => {
//     const provider = new HocuspocusProvider({
//       url: 'ws://127.0.0.1:1234',
//       name: 'example-document',
//     });

//     const yTasks = provider.document.getArray('tasks');
//     yTasks.push([audioState]);
//   };

//   const latestTask = tasks.length > 0 ? tasks[tasks.length - 1] : null;

//   useEffect(() => {
//     if (latestTask?.isPlaying) {
//       audioRef.current.muted = 'muted';
//       audioRef.current.play();
//       audioRef.current.currentTime = latestTask.playCursor;
//     } else audioRef.current.pause();
//   }, [latestTask]);

//   return (
//     <div>
//       <button
//         onClick={() => {
//           setIsHost(!isHost);
//         }}
//       >
//         Is host: {isHost.toString()}
//       </button>
//       <div>
//         <audio
//           src='https://actions.google.com/sounds/v1/alarms/dinner_bell_triangle.ogg'
//           controls={isHost}
//           ref={audioRef}
//           onPlay={handlePlay}
//           onPause={handlePause}
//           muted
//         />
//       </div>
//       <div>
//         <h1>Latest Task:</h1>
//         <ul>
//           <li>{latestTask && <p>{JSON.stringify(latestTask)}</p>}</li>
//         </ul>
//       </div>
//       <h1>Task List</h1>
//       <ul>
//         {tasks.map((task, index) => (
//           <li key={index}>{JSON.stringify(task)}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;

const App = () => {
  const params = useParams();

  const awareness = new awarenessProtocol.Awareness(new Y.Doc());

  const provider = new HocuspocusProvider({
    url: 'ws://4d3e-117-20-28-75.ngrok-free.app:1234',
    name: params.document,
    awareness,
    onClose: ({ event }) => {
      // …
      console.log({event});
    },
      // onAwarenessUpdate: (updates) => {
      //   // …
      //   console.log({updates});
      // },
      // onAwarenessChange: (data) => {
      //   // …
      //   console.log({data});
      // },
  });

  console.log("Parent");
  return (
    <div>
      <Doc1 documentName={params.document} provider={provider} awareness={awareness}/>
      {/* <Doc2/> */}
    </div>
  )
}
export default App;