import React from 'react';
import clsx from 'clsx';

export default function Skeleton({
  height = 'h-4',
  width = 'w-full',
}: {
  height?: string;
  width?: string;
}) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-300 dark:bg-gray-700 rounded-md',
        height,
        width
      )}
    />
  );
}
