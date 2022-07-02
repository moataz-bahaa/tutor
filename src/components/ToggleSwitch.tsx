
interface ToggleSwitchProps {
  name: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ name }) => {
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        name={name}
        id={name}
      />
      <label className="toggle-switch-label" htmlFor={name}>
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
}

export default ToggleSwitch;