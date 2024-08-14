import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

interface SearchInputProps {
  setQuery: React.Dispatch<
    React.SetStateAction<{
      page: number;
      limit: number;
      search: string;
    }>
  >;
  placeholder?: string;
}

const SearchInput = ({ setQuery, placeholder = 'Search…' }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const debounceId = setTimeout(() => {
      setQuery((prev) => ({ ...prev, search: searchTerm }));
    }, 500);

    return () => {
      clearTimeout(debounceId);
    };
  }, [searchTerm]);

  return (
    <div>
      <Input
        size='large'
        style={{ minWidth: '300px' }}
        placeholder={placeholder}
        onChange={(e) => setSearchTerm(e.target.value)}
        prefix={<SearchOutlined />}
      />
    </div>
  );
};

export default SearchInput;
