import React from 'react';

interface ToggleSwitchProps {
  isToggled: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isToggled, onToggle }) => {
  return (
    <button
      className="rw-temp-switch"
      type="button"
      onClick={onToggle}
    >
      {isToggled && <span className="on">C</span>}
      {!isToggled && <span className="off">F</span>}
      <span
        className="rw-temp-slider"
        style={{ transform: isToggled ? ' translateX(28px)' : ' translateX(0px)' }}
      />
    </button>
  );
};

export default ToggleSwitch;
