import { useEffect } from "react";
import { useAppSelector } from "./app/hooks";
import Layout from "./components/Layout/Layout";
import AccountPicker from "./features/auth/components/AccountPicker";
import "./App.css";

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const theme = useAppSelector((state) => state.settings.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (!isAuthenticated) {
    return <AccountPicker />;
  }

  return <Layout />;
}

export default App;
