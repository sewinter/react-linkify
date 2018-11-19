// @flow

import * as React from 'react';

export default (decoratedHref: string, decoratedText: string, key: number, onClick): React.Node => {
  return (
    <a href={decoratedHref} key={key} onClick={onClick}>
      {decoratedText}
    </a>
  );
};
