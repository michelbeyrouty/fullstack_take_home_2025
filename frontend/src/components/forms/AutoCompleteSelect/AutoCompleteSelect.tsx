import "./AutoCompleteSelect.css";
import React, { useState, useRef, useEffect } from "react";
import Chip from "../../library/Chip/Chip";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { IOption } from "../../../typings";

interface AutoCompleteSelectProps {
  name: string;
  label?: string;
  options?: IOption[];
  onValueChange: (selectedValues: any[]) => void;
}

export default function AutoCompleteSelect({ label, name, options = [], onValueChange }: AutoCompleteSelectProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<IOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    const filtered = options.filter(
      (option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedOptions.some((opt) => opt.value === option.value)
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  }

  function handleOptionSelect(option: IOption) {
    setSelectedOptions([...selectedOptions, option]);
    onValueChange([...selectedOptions.map((opt) => opt.value), option.value]);
    setSearchTerm("");
    setIsOpen(false);
  }

  function handleChipRemove(idToRemove: string) {
    const newValue = selectedOptions.filter((opt) => opt.value !== idToRemove);
    onValueChange(newValue.map((opt) => opt.value));
  }

  return (
    <div className="autocomplete-container">
      <label>{label}</label>
      <div className="autocomplete-input-container" ref={dropdownRef}>
        <input
          type="text"
          name={name}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Search users..."
        />
        {isOpen && filteredOptions.length > 0 && (
          <div className="autocomplete-dropdown">
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className="autocomplete-option"
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="chips-container">
        {selectedOptions.map((option) => (
          <Chip key={option.label} label={option.label} onRemove={() => handleChipRemove(option.value)} />
        ))}
      </div>
    </div>
  );
}
