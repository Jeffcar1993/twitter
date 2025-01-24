import styles from "./Boton.module.css";
import * as React from 'react';

type ButtonProps = React.PropsWithChildren &
React.ButtonHTMLAttributes<HTMLButtonElement> &
{
  variant?: "default" | "secondary" | "outline",
  disabled?: boolean,
  size?: "default" | "sm" | "lg" | "icon"
};

function Boton({ children, variant = "default", disabled = false, size ="default", ...rest }: ButtonProps) {
  return (
    <button
    className={`${styles.button} ${styles[variant]} ${styles[size]}` }
    
    disabled = {disabled}
    {...rest}
    >
      {children}
    </button>
);
}

export default Boton;