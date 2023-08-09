import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import SharedLayout from "./SharedLayout/SharedLayout";
import TrackingPage from "../pages/trackingPage/TrackingPage";
import Loader from "./Loader/Loader";

const PostOffice = lazy(() => import("../pages/postOffice/postOffice"));

export default function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<TrackingPage />} />
            <Route path="post-office" element={<PostOffice />} />
            <Route path="*" element={<TrackingPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
