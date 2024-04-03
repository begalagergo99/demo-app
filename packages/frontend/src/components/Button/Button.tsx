export interface ButtonProps {
  label: string;
  style?: ButtonStyle;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export enum ButtonStyle {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}
export const Button = ({ label, style, onClick, type, className }: ButtonProps) => {

  const buttonStyles = {
    [ButtonStyle.PRIMARY]: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",
    [ButtonStyle.SECONDARY]: "bg-white-100 border-2 border-blue-600 hover:bg-blue-50 text-blue-600 font-bold py-2 px-4 rounded",
  }

  const getButtonStyle = (style?: ButtonStyle) => {
    return style ? buttonStyles[style] : buttonStyles[ButtonStyle.PRIMARY];
  }

  return (
    <button
      onClick={onClick}
      type={onClick ? type : "submit"}
      className={`${getButtonStyle(style)} ${className}`}
    >
      {label}
    </button>
  );
};
