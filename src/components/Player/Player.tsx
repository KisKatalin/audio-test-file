import React, { FC } from 'react';
import styles from './Player.module.css';

interface PlayerProps {}

const Player: FC<PlayerProps> = () => (
  <div className={styles.Player} data-testid="Player">
    Player Component
  </div>
);

export default Player;
