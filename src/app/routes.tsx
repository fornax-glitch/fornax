import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/shared/ProtectedRoute";

// =====================
// CORE PAGES
// =====================
const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Admin = lazy(() => import("../pages/Admin/Admin"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const Fleet = lazy(() => import("../pages/Fleet/Fleet"));
const Booking = lazy(() => import("../pages/Booking/Booking"));
const Contact = lazy(() => import("../pages/Contact/Contact"));

// =====================
// SEO TEMPLATE PAGES
// =====================
const CityPage = lazy(() => import("../pages/seo/CityPage"));
const AirportPage = lazy(() => import("../pages/seo/AirportPage"));

// =====================
// SERVICES
// =====================
const AirportTransfer = lazy(() => import("../pages/services/AirportTransfer"));
const AirportDelivery = lazy(() => import("../pages/services/AirportDelivery"));
const PrivateDriver = lazy(() => import("../pages/services/PrivateDriver"));

// =====================
const Loader = () => (
  <div className="p-10 text-center text-gray-400">Chargement...</div>
);

export const router = createBrowserRouter([

  // =====================
  // CORE
  // =====================
  {
    path: "/",
    element: (
      <Layout>
        <Suspense fallback={<Loader />}>
          <Home />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/fleet",
    element: (
      <Layout>
        <Suspense fallback={<Loader />}>
          <Fleet />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/booking",
    element: (
      <Layout>
        <Suspense fallback={<Loader />}>
          <Booking />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <Suspense fallback={<Loader />}>
          <Contact />
        </Suspense>
      </Layout>
    ),
  },

  // =====================
  // SERVICES
  // =====================
  {
    path: "/services/airport-transfer",
    element: (
      <Suspense fallback={<Loader />}>
        <AirportTransfer />
      </Suspense>
    ),
  },
  {
    path: "/services/airport-delivery",
    element: (
      <Suspense fallback={<Loader />}>
        <AirportDelivery />
      </Suspense>
    ),
  },
  {
    path: "/services/private-driver",
    element: (
      <Suspense fallback={<Loader />}>
        <PrivateDriver />
      </Suspense>
    ),
  },

  // =====================
  // 🏙️ CITY SEO PAGES
  // =====================
  {
    path: "/location-voiture/:city",
    element: (
      <Layout>
        <Suspense fallback={<Loader />}>
          <CityPage />
        </Suspense>
      </Layout>
    ),
  },

  // =====================
  // ✈️ AIRPORT SEO PAGES
  // =====================
  {
    path: "/location-voiture-aeroport/:airport",
    element: (
      <Layout>
        <Suspense fallback={<Loader />}>
          <AirportPage />
        </Suspense>
      </Layout>
    ),
  },

  // =====================
  // AUTH
  // =====================
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <Admin />
        </Suspense>
      </ProtectedRoute>
    ),
  },

  // =====================
  // 404
  // =====================
  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);