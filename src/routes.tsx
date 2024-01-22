import { Routes as Switch, Route } from "react-router-dom";
import MainLayout from "./components/layouts/mainLayout";
import { PATH } from "./constants/path";
import Index from "./pages";

export default function Routes() {
  return (
    <Switch>
      <Route element={<MainLayout />}>
        <Route key={PATH.INDEX} path={PATH.INDEX} element={<Index />} />
      </Route>
    </Switch>
  );
}
