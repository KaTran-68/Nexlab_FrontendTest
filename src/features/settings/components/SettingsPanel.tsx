import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { setTheme, type Theme } from "../settingsSlice";
import { setLanguage } from "../settingsSlice";
import { renameUser } from "../../auth/authSlice";
import { renameAccount } from "../../accounts/accountsSlice";
import type { Language } from "../../../utils/i18n";
import { t } from "../../../utils/i18n";
import "./SettingsPanel.css";

const SettingsPanel = () => {
  const dispatch = useAppDispatch();
  const { theme, language } = useAppSelector((state) => state.settings);
  const currentUser = useAppSelector((state) => state.auth.user);
  const [newName, setNewName] = useState(currentUser?.name ?? "");

  const handleRename = () => {
    const trimmed = newName.trim();
    if (!trimmed || !currentUser || trimmed === currentUser.name) return;
    dispatch(renameUser(trimmed));
    dispatch(renameAccount({ id: currentUser.id, name: trimmed }));
  };

  return (
    <div className="settings-panel">
      <h2 className="settings-panel__title">{t("settings.title", language)}</h2>

      <div className="settings-panel__section">
        <h3 className="settings-panel__label">
          {t("settings.rename", language)}
        </h3>
        <div className="settings-panel__rename">
          <input
            className="settings-panel__rename-input"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={t("settings.rename_placeholder", language)}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
          />
          <button
            className="settings-panel__rename-btn"
            onClick={handleRename}
            disabled={!newName.trim() || newName.trim() === currentUser?.name}
          >
            {t("settings.rename_save", language)}
          </button>
        </div>
      </div>

      <div className="settings-panel__section">
        <h3 className="settings-panel__label">
          {t("settings.theme", language)}
        </h3>
        <div className="settings-panel__options">
          {(["light", "dark"] as Theme[]).map((th) => (
            <button
              key={th}
              className={`settings-panel__option ${theme === th ? "settings-panel__option--active" : ""}`}
              onClick={() => dispatch(setTheme(th))}
            >
              <i className={`fas ${th === "light" ? "fa-sun" : "fa-moon"}`} />
              <span>
                {th === "light"
                  ? t("settings.light", language)
                  : t("settings.dark", language)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="settings-panel__section">
        <h3 className="settings-panel__label">
          {t("settings.language", language)}
        </h3>
        <div className="settings-panel__options">
          {(["vi", "en"] as Language[]).map((lang) => (
            <button
              key={lang}
              className={`settings-panel__option ${language === lang ? "settings-panel__option--active" : ""}`}
              onClick={() => dispatch(setLanguage(lang))}
            >
              <span>
                {lang === "vi"
                  ? t("settings.vietnamese", language)
                  : t("settings.english", language)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
