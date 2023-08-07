import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import SharedLayout from "./SharedLayout/SharedLayout";
import Home from "../pages/home/home";
import Loader from "./Loader/Loader";

const PostOffice = lazy(() => import("../pages/postOffice/postOffice"));

export default function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="post-office" element={<PostOffice />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
