import type React from "react";
import { useAppSelector } from "../../../app/hooks";
import { t } from "../../../utils/i18n";
import "./SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const lang = useAppSelector((state) => state.settings.language);

  return (
    <div className="search-bar">
      <i className="fas fa-search search-bar__icon" />
      <input
        type="text"
        className="search-bar__input"
        placeholder={t("search.placeholder", lang)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
