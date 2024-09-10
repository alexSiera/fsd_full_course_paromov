const ToggleTaskCheckbox = ({
  value,
  onToggle,
}: {
  value: boolean;
  onToggle: () => void;
}) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={() => onToggle()} />
      done
    </label>
  );
};

export default ToggleTaskCheckbox;
