import "./Chip.css";

export default function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div className="chip">
      <span>{label}</span>
      <button type="button" className="chip-remove" onClick={onRemove}>
        ×
      </button>
    </div>
  );
}
