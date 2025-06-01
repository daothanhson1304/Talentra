import { Input } from '@ttrak/ui/components/input';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

interface SearchEmployeeProps {
  onSearch: (value: string) => void;
}

export default function SearchEmployee({ onSearch }: SearchEmployeeProps) {
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 300);
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  return (
    <div>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search employee"
      />
    </div>
  );
}
