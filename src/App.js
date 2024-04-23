import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRouter from "./router/AppRouter";
import { loadUser } from "./store/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
