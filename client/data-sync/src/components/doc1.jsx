/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line react/prop-types
export const Doc1 = ({ documentName, provider, awareness }) => {
  const [tasks, setTasks] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [adminUser, setAdminUser] = useState({});
  const isAdmin = localStorage.getItem('isHost');
  const audioRef = useRef();

  const handlePlay = () => {
    if (isAdmin) {
      handleAudio({
        isPlaying: true,
        timestamp: Date.now(),
        playCursor: audioRef.current.currentTime,
      });
    }
  };

  const handlePause = () => {
    if (isAdmin) {
      handleAudio({
        isPlaying: false,
        timestamp: Date.now(),
        playCursor: audioRef.current.currentTime,
      });
    }
  };

  useEffect(() => {
    // console.log({ states });

    const yTasks = provider.document.getArray('tasks');
    const updateTasks = () => {
      const retrievedTasks = yTasks.toArray();
      const sortedTasks = retrievedTasks.sort(
        (a, b) => a.timestamp - b.timestamp
      );
      setTasks(sortedTasks);
    };

    // Listen for changes
    yTasks.observe(updateTasks);

    // Clean up the listener when the component unmounts
    return () => {
      yTasks.unobserve(updateTasks);
    };
  }, []);

  const handleAudio = (audioState) => {
    const yTasks = provider.document.getArray('tasks');
    yTasks.push([audioState]);
  };

  const latestTask = tasks.length > 0 ? tasks[tasks.length - 1] : null;

  useEffect(() => {
    if (latestTask?.isPlaying) {
      audioRef.current.muted = 'muted';
      audioRef.current.play();
      audioRef.current.currentTime = latestTask.playCursor;
    } else audioRef.current.pause();
  }, [latestTask]);

  awareness.on('update', (states) => {
    console.log('---------', states, adminUser.clientId);
    //   console.log(awareness.getStates().find(state => state?.role === 'admin'));
    if (!isAdmin && 
      states.removed.length > 0 &&
      states.removed.includes(adminUser.clientId)
    ) {
      alert('Admin offline');
      setAdminUser({});
    }

    if (states.added.length > 0) {
      if (isAdmin) {
        console.log('Admin created');
        awareness.setLocalStateField('role', 'admin');
        awareness.setLocalStateField('name', 'Admin User');
        awareness.setLocalStateField('status', 'online');
        //   awareness.setLocalState();
      } else {
        console.log('Client created');
        awareness.setLocalStateField('role', 'client');
        awareness.setLocalStateField('name', 'User');
        awareness.setLocalStateField('status', 'online');
      }
    }
    awareness.getStates().forEach((state, clientId) => {
      if (state?.role === 'admin') {
        console.log('Admin user:', state, clientId);
        setAdminUser({ ...state, clientId });
      }
    });
    console.log('----------------------');
  });

  return (
    <div>
      <h1>{documentName}</h1>
      <button
        onClick={() => {
          setIsHost(!isHost);
        }}
      >
        Is host: {isHost.toString()}
      </button>
      <div>
        <audio
          width='100%'
          height='auto'
          controls
          ref={audioRef}
          onPlay={handlePlay}
          onPause={handlePause}
          muted
        >
          <source
            src='https://actions.google.com/sounds/v1/alarms/dinner_bell_triangle.ogg'
            type='audio/mpeg'
          ></source>
        </audio>
      </div>
      <div>
        <h3>Latest Task:</h3>
        <ul>
          <li>{latestTask && <p>{JSON.stringify(latestTask)}</p>}</li>
        </ul>
      </div>
      <h3>Task List</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{JSON.stringify(task)}</li>
        ))}
      </ul>
    </div>
  );
};
