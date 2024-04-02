export interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button = ({ label, onClick, type, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={onClick ? type : "submit"}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {label}
    </button>
  );
};
