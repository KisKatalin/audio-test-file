import React, { lazy, Suspense } from 'react';

const LazyPlayer = lazy(() => import('./Player'));

const Player = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPlayer {...props} />
  </Suspense>
);

export default Player;
