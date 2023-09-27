import { useEffect, useRef, useState } from 'react';
import * as awarenessProtocol from 'y-protocols/awareness.js';
import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';

export const Doc2 = () => {
  const [tasks, setTasks] = useState([]);
  const [isHost, setIsHost] = useState(false);

  const audioRef = useRef();

  const handlePlay = () => {
    handleAudio({
      isPlaying: true,
      timestamp: Date.now(),
      playCursor: audioRef.current.currentTime,
    });
  };

  const handlePause = () => {
    handleAudio({
      isPlaying: false,
      timestamp: Date.now(),
      playCursor: audioRef.current.currentTime,
    });
  };

  useEffect(() => {
    const awareness = new awarenessProtocol.Awareness(new Y.Doc());
    const provider = new HocuspocusProvider({
      url: 'ws://127.0.0.1:1234',
      name: 'document-2',
      awareness,
    //   onAwarenessUpdate: (updates) => {
    //     // …
    //     // console.log({updates});
    //   },
    //   onAwarenessChange: (data) => {
    //     // …
    //     // console.log({data});
    //   },
    });

    provider.setAwarenessField('user', {
      name: 'Kevin Jahns',
      color: '#ffcc00',
      isHost,
    });

    awareness.on('update', ({ removed }) => {
      console.log({ removed });
    });

    const states = awareness.getStates().entries();

    console.log({ states });

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
    const provider = new HocuspocusProvider({
      url: 'ws://127.0.0.1:1234',
      name: 'example-document',
    });

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

  return (
    <div>
		<h1>Document 2</h1>
      <button
        onClick={() => {
          setIsHost(!isHost);
        }}
      >
        Is host: {isHost.toString()}
      </button>
      <div>
        <audio
          src='https://actions.google.com/sounds/v1/alarms/dinner_bell_triangle.ogg'
          controls={isHost}
          ref={audioRef}
          onPlay={handlePlay}
          onPause={handlePause}
          muted
        />
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
