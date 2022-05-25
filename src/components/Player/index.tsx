import React, { useCallback, useState, useRef } from 'react';
import SoundDriver from './SoundDriver';
import styles from './Player.module.css'
function Player() {
  const soundController = useRef<undefined | SoundDriver>(undefined);
  const [loading, setLoading] = useState(false);
   

  const uploadAudio = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files ||!files.length) {
      return;
    }

    setLoading(true);

    const audioFile = files[0];

    if (!audioFile || !audioFile.type.includes('audio')) {
      throw new Error('Wrong audio file');
    }

    const soundInstance = new SoundDriver(audioFile);
    try {
      await soundInstance.init(document.getElementById('waveContainer'));
      soundController.current = soundInstance;
    } catch(err: any) {
      console.log(err);
    } finally {
      setLoading(false);
      soundInstance.drawChart();
    }
  }, []);
  const clicOnFileButton = function() {
      document.getElementById('file')?.click();

  }
  const togglePlayer = useCallback(
    (type: string) => () => {
      if (type === 'play') {
        soundController.current?.play();
      } else if (type === 'stop') {
        soundController.current?.pause(true);
      } else {
        soundController.current?.pause();
      }
    },
    []
  );

  const onVolumeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      soundController.current?.changeVolume(Number(event.target.value));
    },
    [soundController]
  );

  return (
    <div style={{ width: '100%' }}>
      {!soundController.current && (
        <div style={{ textAlign: 'center', marginTop: '30px', fontSize :'17px'}}>
          Choose a sound &nbsp;
          <input
          id='file'
            type="file"
            name="sound"
            onChange={uploadAudio}
            accept="audio/*"
            style = {{ display: 'none'}}
            
          />
     
          <button id="button" onClick={clicOnFileButton} style = {{backgroundColor: '#e7e7e7', color: 'black', border: 'none', borderRadius: '5px', width: '120px', height:'30px', boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px', marginLeft: '10px'}}>Add file</button>
        </div>
      )}<div style = {{textAlign: 'center',marginTop: '70px', fontSize :'20px'}}>
      {loading && 'Loading...' }
</div>
      <div style={{ width: '100%', height: '392px' }} id="waveContainer" />

      {!loading && soundController.current && (
        <div id="soundEditor">
          <div id="controllPanel">
            <input
            id='range'
              type="range"
              onChange={onVolumeChange}
              defaultValue={1}
              min={-1}
              max={1}
              step={0.01}
              style = {{width: '150px', accentColor: '#BC8F8F'}}
            />

            <button className={styles.BtnSetting} type="button" onClick={togglePlayer('play')} style = {{}}>
              Play
            </button>

            <button className={styles.BtnSetting} type="button" onClick={togglePlayer('pause')} >
              Pause
            </button>

            <button className={styles.BtnSetting} type="button" onClick={togglePlayer('stop')}>
              Stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Player;