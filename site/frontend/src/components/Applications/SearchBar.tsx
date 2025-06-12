import { useState } from "react";
import { TextInput, Button, Group } from "@mantine/core";

type Props = {
  onSearch: (term: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group>
        <TextInput
          placeholder="Search by any field"
          value={searchInput}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        />
        <Button type="submit">Search</Button>
      </Group>
    </form>
  );
}
