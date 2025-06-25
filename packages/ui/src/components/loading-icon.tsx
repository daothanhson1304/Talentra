import { Loader } from 'lucide-react';

export default function LoadingIcon() {
  return (
    <Loader
      size={16}
      style={{
        animation: 'spin 1.5s linear infinite',
      }}
    />
  );
}
