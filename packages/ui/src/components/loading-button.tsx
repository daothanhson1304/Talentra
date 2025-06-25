import { ReactNode } from 'react';
import { Button } from './button.js';
import LoadingIcon from './loading-icon.js';

interface LoadingButtonProps {
  isLoading: boolean;
  children: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive';
  onClick?: () => void;
}

export default function LoadingButton({
  isLoading,
  children,
  disabled,
  type = 'button',
  className = '',
  onClick,
  ...props
}: Readonly<LoadingButtonProps>) {
  return (
    <Button
      className={`relative w-fit ${className}`}
      variant='default'
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      <span className={isLoading ? 'invisible' : 'visible'}>{children}</span>

      {isLoading && (
        <span className='absolute inset-0 flex items-center justify-center'>
          <LoadingIcon />
        </span>
      )}
    </Button>
  );
}
