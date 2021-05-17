import React from 'react';

interface LoadingProps {
  text?: string;
}

export default function Loading({ text = 'Please wait...' }: LoadingProps) {
  return (
    <div className="loading-page fullscreen center-children">
      <span className="loading-page__icon-container">
        <i className="fas fa-spin fa-circle-notch loading-page__icon-container__icon"></i>
      </span>
      <p>{text}</p>
    </div>
  );
}
