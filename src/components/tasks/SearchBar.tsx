import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <Input
      className="w-full md:w-80"
      placeholder="🔍 Search by Task No or Title..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}