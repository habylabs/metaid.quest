import styles from '../styles/components/Button.module.css';

function Button({ children, onClick, small = false, outline = false, disabled = false }) {
  const buttonSize = small ? styles.small : styles.large;
  const buttonColor = disabled ? styles.disabled : outline ? styles.outline : styles.primary;
  const buttonPointer = disabled ? styles.disabledButtonPointer : styles.enabledButtonPointer;

  return (
    <button
      className={`monospace-font ${styles.ctaButton} ${buttonSize} ${buttonColor} ${buttonPointer}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
