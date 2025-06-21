import React, { Suspense } from 'react';
import DesignPage from './DesignPage';

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center my-10">Loading...</div>}>
      <DesignPage />
    </Suspense>
  );
}
