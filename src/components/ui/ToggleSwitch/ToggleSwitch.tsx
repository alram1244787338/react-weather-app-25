import React from 'react';

interface IToggleSwitchProps {
  isCelsius: boolean;
  onClick: () => void;
}

const ToggleSwitch: React.FC<IToggleSwitchProps> = (props) => {
  return (
    <button
      className="rw-temp-switch"
      type="button"
      onClick={props.onClick}
    >
      {props.isCelsius && <span className="on">C</span>}
      {!props.isCelsius && <span className="off">F</span>}
      <span
        className="rw-temp-slider"
        style={{ transform: props.isCelsius ? ' translateX(28px)' : ' translateX(0px)' }}
      />
    </button>
  );
};

export default ToggleSwitch;
