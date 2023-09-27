/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import SongTile from '../components/song-tile';

const songsList = [
  '/songs/SoundHelix-Song-1.mp3',
  '/songs/SoundHelix-Song-2.mp3',
  '/songs/SoundHelix-Song-3.mp3',
  '/songs/SoundHelix-Song-4.mp3',
  '/songs/SoundHelix-Song-5.mp3',
  '/songs/SoundHelix-Song-6.mp3',
  '/songs/SoundHelix-Song-7.mp3',
  '/songs/SoundHelix-Song-8.mp3',
  '/songs/SoundHelix-Song-9.mp3',
];
// eslint-disable-next-line react/prop-types
export const SongTable = ({ isHost = false, provider }) => {
  const [audioBuffers, setAudioBuffers] = useState([]);
  const [currentSource, setCurrentSource] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [current, setCurrent] = useState({});

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const currentTask = provider.document.getMap('currentTask');
  const trackPlaying = currentTask.get('currentTask');

  console.log({ current, trackPlaying, isHost });

  useEffect(() => {
    const fetchAudioData = async () => {
      try {
        const audioDataPromises = songsList.map((url) =>
          fetch(url).then((response) => response.arrayBuffer())
        );

        const buffers = await Promise.all(audioDataPromises);
        const audioBuffers = await Promise.all(
          buffers.map((buffer) => audioContext.decodeAudioData(buffer))
        );

        setAudioBuffers(audioBuffers);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    fetchAudioData();
  }, []);

  useEffect(() => {
    if (trackPlaying?.songName && !isHost && trackPlaying.isPlaying) {
      console.log('PLAY AUDIO ON CLIENT');
      playAudio(audioBuffers[4], trackPlaying?.songName);
      setCurrent(trackPlaying);
    }
  }, [trackPlaying]);

  useEffect(() => {
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

  const playAudio = (buffer, songName) => {
      stopAudio();
    if (isHost) {

      const currentTask = provider.document.getMap('currentTask');
      currentTask.set('currentTask', {
        songName,
        isPlayed: false,
        isPlaying: true,
      });

      setCurrent({
        songName,
        isPlayed: false,
        isPlaying: true,
      });

      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);

      setCurrentSource(source);
    } else {
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);

      setCurrentSource(source);
    }
  };

  console.log(audioContext);

  const stopAudio = () => {
    if (currentSource) {
      const currentTask = provider.document.getMap('currentTask');

      const tasks = provider.document.getArray('tasks');

      tasks.push([
        {
          songName: currentTask.get('currentTask').songName,
          isPlayed: true,
          isPlaying: false,
        },
      ]);
      currentSource.stop();
      setCurrentSource(null);
    }
  };

  console.log(tasks);
  return (
    <div>
      <h1>{current.songName}</h1>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <p>{current?.songName}</p>
        <button onClick={stopAudio}>End Music</button>
        <div
          style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
        >
          <SongTile
            name='Song 1'
            isPlayed={tasks.some((task) => task.songName === 'Song 1')}
            onClick={() => {
              playAudio(audioBuffers[0], 'Song 1');
            }}
          />
          <SongTile
            name='Song 2'
            isPlayed={tasks.some((task) => task.songName === 'Song 2')}
            onClick={() => {
              playAudio(audioBuffers[1], 'Song 2');
            }}
          />
          <SongTile
            name='Song 3'
            isPlayed={tasks.some((task) => task.songName === 'Song 3')}
            onClick={() => {
              playAudio(audioBuffers[2], 'Song 3');
            }}
          />
        </div>
        <div
          style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
        >
          <SongTile
            name='Song 4'
            isPlayed={tasks.some((task) => task.songName === 'Song 4')}
            onClick={() => {
              playAudio(audioBuffers[3], 'Song 4');
            }}
          />
          <SongTile
            name='Song 5'
            isPlayed={tasks.some((task) => task.songName === 'Song 5')}
            onClick={() => {
              playAudio(audioBuffers[4], 'Song 5');
            }}
          />
          <SongTile
            name='Song 6'
            isPlayed={tasks.some((task) => task.songName === 'Song 6')}
            onClick={() => {
              playAudio(audioBuffers[5], 'Song 6');
            }}
          />
        </div>
        <div
          style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
        >
          <SongTile
            name='Song 7'
            isPlayed={tasks.some((task) => task.songName === 'Song 7')}
            onClick={() => {
              playAudio(audioBuffers[6], 'Song 7');
            }}
          />
          <SongTile
            name='Song 8'
            isPlayed={tasks.some((task) => task.songName === 'Song 8')}
            onClick={() => {
              playAudio(audioBuffers[7], 'Song 8');
            }}
          />
          <SongTile
            name='Song 9'
            isPlayed={tasks.some((task) => task.songName === 'Song 9')}
            onClick={() => {
              playAudio(audioBuffers[8], 'Song 9');
            }}
          />
        </div>
      </div>
    </div>
  );
};
