import { useEffect, useState } from "react";
import Input from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";
import { Select, SelectItem } from "../../../../components/Select/Select";

export interface SearchBarChangeEvent {
  searchText: string;
  status: string;
}

interface SearchBarProps {
  selectableOptions: SelectItem[];
  onFiltersChange: (changeEvent: SearchBarChangeEvent) => void;
  onCreateNewItem: () => void;
  className?: string;
}

const SearchBar = ({
  selectableOptions,
  onFiltersChange,
  onCreateNewItem,
  className,
}: SearchBarProps) => {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState<SelectItem | null>(
    selectableOptions[0]
  );

  const handleFiltersChange = () => {
    const changeEvent: SearchBarChangeEvent = {
      searchText,
      status: selectedItem?.value || "",
    };
    onFiltersChange(changeEvent);
  };

  const handleCreateNewItem = () => {
    onCreateNewItem();
  };

  useEffect(() => {
    handleFiltersChange();
  }, [searchText, selectedItem]);

  useEffect(() => {
    console.log(selectableOptions);
  }, []);

  return (
    <div className={`flex gap-20 ${className}`}>
      <Input
        type="text"
        placeholder="search by title, description"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        className="mr-2 w-64"
      />

      <Select
        items={selectableOptions}
        selectedItem={selectedItem}
        onSelectedItemChange={(item) => setSelectedItem(item)}
      />

      <Button label="Create new task" onClick={handleCreateNewItem} />
    </div>
  );
};

export default SearchBar;
