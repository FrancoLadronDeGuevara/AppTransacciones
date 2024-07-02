import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import SummaryPage from "./pages/SummaryPage";
import TransactionsListPage from "./pages/TransactionsListPage";
import RootLayout from "./components/RootLayout/RootLayout";

function App() {

  return (
    <HashRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transactions" element={<TransactionsListPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </RootLayout>
    </HashRouter>
  );
}

export default App;
