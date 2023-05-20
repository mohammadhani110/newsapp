import * as React from "react";
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
// import useAuth from "../hooks/useAuth";

const Home = React.lazy(() => import("../pages/home"));
const Subscription = React.lazy(() => import("../pages/subscription"));
const BlogDetails = React.lazy(() => import("../pages/blog-details"));
const Login = React.lazy(() => import("../pages/login"));
const Register = React.lazy(() => import("../pages/register"));

function ProtectedRoute({ isAuthenticated, subscribed }) {
  if (isAuthenticated === true && subscribed) {
    return (
      <Suspense fallback={<Loader />}>
        <div>
          <Header />
          <Outlet />
        </div>
      </Suspense>
    );
  } else if (isAuthenticated === true && !subscribed) {
    return <Navigate to="/subscription" />;
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
  subscribed,
}) {
  if (isAuthenticated === true && subscribed) {
    return <Navigate to="/" />;
  } else if (isAuthenticated === true && !subscribed) {
    return <Navigate to="/subscription" />;
  }
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
}

function RouterIndex() {
  //   const { isAuthenticated } = useAuth();
  const isAuthenticated = true;
  const subscribed = true;
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
                subscribed={subscribed}
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
                subscribed={subscribed}
              />
            }
          />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                subscribed={subscribed}
              />
            }
          >
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route
            exact
            path="/blog/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                subscribed={subscribed}
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
                subscribed={subscribed}
              />
            }
          >
            <Route path="/subscription" element={<Subscription />} />
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
