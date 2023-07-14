function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>{message}</span>
      <span>🛑</span>
    </p>
  );
}

export default ErrorMessage;
