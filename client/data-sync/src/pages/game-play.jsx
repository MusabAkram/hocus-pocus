import { SongTable } from '../components/song-table';
import * as Y from 'yjs';

import { HocuspocusProvider } from '@hocuspocus/provider';
import * as awarenessProtocol from 'y-protocols/awareness.js';
import { useState } from 'react';

export const GamePlay = () => {
  const isHost = localStorage.getItem('isHost');
  const [startGame, setStartGame] = useState(false);


  const awareness = new awarenessProtocol.Awareness(new Y.Doc());

  const provider = new HocuspocusProvider({
    url: 'ws://192.168.31.33:1234',
    name: 'game',
    awareness,
  });

  return (
    <div>
      {!startGame ? (
        <button onClick={() => setStartGame(true)}>Start Game</button>
      ) : (
        <SongTable isHost={!!isHost} provider={provider} />
      )}
    </div>
  );
};
