import type React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { logout } from "../../auth/authSlice";
import { updateAccountStatus } from "../../accounts/accountsSlice";
import { Avatar } from "../../../components";
import { t, type Language } from "../../../utils/i18n";
import type { ActiveView } from "../../../components/Layout/Layout";
import type { TranslationKey } from "../../../utils/i18n";
import "./Sidebar.css";

interface NavItem {
  icon: string;
  labelKey: TranslationKey;
  view: ActiveView | null;
}

// const navItems: NavItem[] = [
//   { icon: "fa-building", labelKey: "nav.properties", view: null },
//   { icon: "fa-comment-dots", labelKey: "nav.chat", view: "chat" },
//   { icon: "fa-calendar", labelKey: "nav.calendar", view: null },
//   { icon: "fa-tag", labelKey: "nav.offers", view: null },
//   { icon: "fa-file-alt", labelKey: "nav.documents", view: null },
//   { icon: "fa-cog", labelKey: "nav.settings", view: "settings" },
// ];

const navItems: NavItem[] = [
  { icon: "fa-comment-dots", labelKey: "nav.chat", view: "chat" },
  { icon: "fa-cog", labelKey: "nav.settings", view: "settings" },
];
interface SidebarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const lang: Language = useAppSelector((state) => state.settings.language);

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        {user && (
          <Avatar
            name={user.name}
            avatar={user.avatar}
            size="md"
            status={user.status}
          />
        )}
        <span className="sidebar__username">{user?.name ?? "User"}</span>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <button
            key={item.labelKey}
            className={`sidebar__nav-item ${item.view === activeView ? "sidebar__nav-item--active" : ""}`}
            title={t(item.labelKey, lang)}
            onClick={() => item.view && onNavigate(item.view)}
          >
            <i className={`fas ${item.icon}`} />
            <span>{t(item.labelKey, lang)}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__bottom">
        <button
          className="sidebar__nav-item sidebar__logout-btn"
          title={t("nav.logout", lang)}
          onClick={() => {
            if (user) {
              dispatch(updateAccountStatus({ id: user.id, status: "offline" }));
            }
            dispatch(logout());
          }}
        >
          <i className="fas fa-sign-out-alt" />
          <span>{t("nav.logout", lang)}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
