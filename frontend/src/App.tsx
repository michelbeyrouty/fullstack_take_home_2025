import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import WorkOrdersContainer from "./containers/WorkOrdersContainer/WorkOrdersContainer";
import WorkOrderContainer from "./containers/WorkOrderContainer/WorkOrderContainer";
import HomeContainer from "./containers/HomeContainer/HomeContainer";
import CreateWorkOrderContainer from "./containers/CreateWorkOrderContainer/CreateWorkOrderContainer";
import NotFoundContainer from "./containers/NotFoundContainer/NotFoundContainer";
import ProductivityContainer from "./containers/ProductivityContainer/ProductivityContainer";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" Component={HomeContainer} />
          <Route path="/workorders/create" Component={CreateWorkOrderContainer} />
          <Route path="/workorders/:id" Component={WorkOrderContainer} />
          <Route path="/workorders" Component={WorkOrdersContainer} />
          <Route path="/productivity" Component={ProductivityContainer} />
          <Route path="*" Component={NotFoundContainer} />
        </Routes>
      </Layout>
    </Router>
  );
}
