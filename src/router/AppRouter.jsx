import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Creator from "../routes/Creator";
import Home from "../routes/Home";
import LogIn from "../routes/LogIn";
import Main from "../routes/Main";
import PageNotFound from "../routes/PageNotFound";
import Register from "../routes/Register";
import Report from "../routes/Report";
import Reports from "../routes/Reports";
import ReportsAll from "../routes/ReportsAll";
import Template from "../routes/Template";
import Templates from "../routes/Templates";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/main/:userId"
          loader={({ params }) => params.userId}
          element={<Main />}
        />
        <Route
          path="/creator/:userId"
          loader={({ params }) => params.userId}
          element={<Creator />}
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/report/:reportId/:mode"
          loader={({ params }) => (params.reportId, params.mode)}
          element={<Report />}
        />
        <Route
          path="/reports/:userId/:templateId"
          loader={({ params }) => (params.userId, params.templateId)}
          key={document.location.href}
          element={<Reports />}
        />
        <Route
          path="/reports/:userId/all"
          loader={({ params }) => (params.userId, params.templateId)}
          key={document.location.href}
          element={<ReportsAll />}
        />
        <Route
          path="/template/:templateId/:mode"
          loader={({ params }) => (params.templateId, params.mode)}
          element={<Template />}
        />
        <Route
          path="/templates/:userId"
          loader={({ params }) => params.userId}
          element={<Templates />}
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
