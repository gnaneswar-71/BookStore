function Toast({ message, onClose }) {
  return (
    <div className="toast">
      <span>✓</span>
      <p>{message}</p>

      <button onClick={onClose}>×</button>
    </div>
  );
}

export default Toast;