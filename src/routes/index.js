import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// containers

// login
import LoginContainer from "../containers/login";

// twitter callback
import CallbackContainer from "../containers/callback";

// dashboard
import DashboardContainer from "../containers/dashboard";

// components
import ProtectedRoute from "../components/ProtectedRoute";
import PageNotFound from "../components/PageNotFound";
import Spinner from "../components/Spinner";

// utils
import { TWITTER_APP_TOKEN } from "../utils/config";
import { useMergeState } from "../utils/custom-hooks";

export default function RoutesContainer() {
  const [state, setState] = useMergeState({ isLoggedIn: false });

  const isAppLoading =
    localStorage.getItem(TWITTER_APP_TOKEN) && !state.isLoggedIn;

  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <div className="w-full h-screen">
        {isAppLoading ? (
          <div className="mt-10 flex justify-center">
            <Spinner loading={isAppLoading} />
          </div>
        ) : (
          <div className="p-8">
            <Routes>
              <Route path="login" element={<LoginContainer />} />

              <Route path="callback" element={<CallbackContainer />} />

              {/* Dashboard Routes */}
              <Route
                path="dashboard"
                element={
                  //   <ProtectedRoute isLoggedIn={state.isLoggedIn}>
                  <DashboardContainer />
                  //   </ProtectedRoute>
                }
              />

              <Route
                path="/"
                element={
                  <Navigate to={state.isLoggedIn ? "/dashboard" : "/login"} />
                }
              />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}
