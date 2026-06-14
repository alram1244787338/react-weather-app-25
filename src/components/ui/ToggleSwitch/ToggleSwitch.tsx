import React from 'react';

interface IToggleSwitchProps {
  onClick: () => void;
  isToggled: boolean;
}

const ToggleSwitch: React.FC<IToggleSwitchProps> = (props) => {
  return (
    <button
      className="rw-temp-switch"
      type="button"
      onClick={props.onClick}
    >
      {props.isToggled && <span className="on">C</span>}
      {!props.isToggled && <span className="off">F</span>}
      <span className="rw-temp-slider" style={{ transform: props.isToggled ? ' translateX(28px)' : ' translateX(0px)' }} />
    </button>
  );
};

export default ToggleSwitch;
