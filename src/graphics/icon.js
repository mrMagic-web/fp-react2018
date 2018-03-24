import React from 'react';

const Icon = props => {
  return (
    <div className={props.className} dangerouslySetInnerHTML={{__html: props.icon }} />
  );
};

Icon.defaultProps = {
  className: "icon",
};

export default Icon;
