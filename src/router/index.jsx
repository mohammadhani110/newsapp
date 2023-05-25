import * as React from "react";
import { store } from "../store";
import { Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Loader from "../components/Loader";
import Error404 from "../pages/error404";
import Header from "../components/Header";
import isEmpty from "../utils/isEmpty";
import { useSelector } from "react-redux";
// import useAuth from "../hooks/useAuth";

const Home = React.lazy(() => import("../pages/home"));
const Subscription = React.lazy(() => import("../pages/subscription"));
const BlogDetails = React.lazy(() => import("../pages/blog-details"));
const BlogByCategory = React.lazy(() => import("../pages/blog-by-category"));
const Login = React.lazy(() => import("../pages/login"));
const Register = React.lazy(() => import("../pages/register"));

function ProtectedRoute({ isAuthenticated, isSubscribed }) {
  if (isAuthenticated && isSubscribed) {
    return (
      <Suspense fallback={<Loader />}>
        <div>
          <Header />
          <Outlet />
        </div>
      </Suspense>
    );
  } else if (isAuthenticated && !isSubscribed) {
    return (
      <Suspense fallback={<Loader />}>
        <div>
          <Header subscriptionPage={true} />
          <Outlet />
        </div>
      </Suspense>
    );
  }
  return <Navigate to="/login" />;
}

// function NormalRoute({ component: Component, path, homepage }) {
//   if (homepage) {
//     return (
//       <Suspense fallback={<Loader />}>
//         <Header />
//         <Component />
//       </Suspense>
//     );
//   }
//   return (
//     <Suspense fallback={<Loader />}>
//       <div>
//         <Header />
//         <Component />
//       </div>
//     </Suspense>
//   );
// }

function UnAuthenticatedRoute({
  component: Component,
  isAuthenticated,
  isSubscribed,
}) {
  if (isAuthenticated && isSubscribed) {
    return <Navigate to="/" />;
  } else if (isAuthenticated && !isSubscribed) {
    return <Navigate to="/subscription" />;
  }
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
}

function RouterIndex() {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const isSubscribed = useSelector((state) => state.auth?.user?.isSubscribed);
  // const isAuthenticated = true;
  // const isSubscribed = false;

  React.useEffect(() => {}, [isAuthenticated, isSubscribed]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/login"
            element={
              <UnAuthenticatedRoute
                component={Login}
                isAuthenticated={isAuthenticated}
                isSubscribed={isSubscribed}
              />
            }
          />
          <Route
            exact
            path="/register"
            element={
              <UnAuthenticatedRoute
                component={Register}
                isAuthenticated={isAuthenticated}
                isSubscribed={isSubscribed}
              />
            }
          />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isSubscribed={isSubscribed}
              />
            }
          >
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route
            exact
            path="/category/:category"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isSubscribed={isSubscribed}
              />
            }
          >
            <Route
              exact
              path="/category/:category"
              element={<BlogByCategory />}
            />
          </Route>
          <Route
            exact
            path="/blog/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isSubscribed={isSubscribed}
              />
            }
          >
            <Route exact path="/blog/:id" element={<BlogDetails />} />
          </Route>
          <Route
            exact
            path="/subscription"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isSubscribed={isSubscribed}
              />
            }
          >
            <Route exact path="/subscription" element={<Subscription />} />
          </Route>
          {/* <Route exact path='/location' element={<ProtectedRoute isAuthenticated={isAuthenticated} path="/location" />}>
                        <Route path='/location' element={<FindLocation />} />
                    </Route> */}

          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouterIndex;
