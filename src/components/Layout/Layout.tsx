import type React from "react";
import { useState, useCallback, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import Sidebar from "../../features/sidebar/components/Sidebar";
import ConversationList from "../../features/conversations/components/ConversationList";
import ChatWindow from "../../features/chat/components/ChatWindow";
import SettingsPanel from "../../features/settings/components/SettingsPanel";
import "./Layout.css";

export type ActiveView = "chat" | "settings";
export type MobilePanel = "sidebar" | "conversations" | "chatwindow";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
};

const Layout: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>("chat");
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("conversations");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const activeConversationId = useAppSelector(
    (state) => state.chat.activeConversationId,
  );

  useEffect(() => {
    if (isMobile && activeConversationId) {
      setMobilePanel("chatwindow");
    }
  }, [activeConversationId, isMobile]);

  const handleNavigate = useCallback(
    (view: ActiveView) => {
      setActiveView(view);
      if (isMobile) {
        setSidebarOpen(false);
        setMobilePanel(view === "chat" ? "conversations" : "conversations");
      }
    },
    [isMobile],
  );

  const handleMobileBack = useCallback(() => {
    setMobilePanel("conversations");
  }, []);

  if (!isMobile) {
    return (
      <div className="layout">
        <Sidebar activeView={activeView} onNavigate={setActiveView} />
        {activeView === "chat" && (
          <>
            <ConversationList />
            <ChatWindow />
          </>
        )}
        {activeView === "settings" && <SettingsPanel />}
      </div>
    );
  }

  return (
    <div className="layout layout--mobile">
      {sidebarOpen && (
        <div
          className="layout__overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`layout__sidebar-mobile ${sidebarOpen ? "layout__sidebar-mobile--open" : ""}`}
      >
        <Sidebar activeView={activeView} onNavigate={handleNavigate} />
      </div>

      {activeView === "chat" && mobilePanel === "conversations" && (
        <div className="layout__mobile-panel">
          <div className="layout__mobile-header">
            <button
              className="layout__menu-btn"
              onClick={() => setSidebarOpen(true)}
            >
              <i className="fas fa-bars" />
            </button>
          </div>
          <ConversationList />
        </div>
      )}

      {activeView === "chat" && mobilePanel === "chatwindow" && (
        <div className="layout__mobile-panel">
          <ChatWindow onBack={handleMobileBack} />
        </div>
      )}

      {activeView === "settings" && (
        <div className="layout__mobile-panel">
          <div className="layout__mobile-header">
            <button
              className="layout__menu-btn"
              onClick={() => setSidebarOpen(true)}
            >
              <i className="fas fa-bars" />
            </button>
          </div>
          <SettingsPanel />
        </div>
      )}
    </div>
  );
};

export default Layout;
