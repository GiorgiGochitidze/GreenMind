import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { LoadUser } from "./store/slices/userSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(LoadUser());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
