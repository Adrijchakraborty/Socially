import React from "react";
const LazyHome = React.lazy(() => import("./Home"))
const LazySignup = React.lazy(() => import("./Signup"))
const LazyLogIn = React.lazy(() => import("./Login"))
const LazyProfile = React.lazy(() => import("./Profile"))
const LazyMessages = React.lazy(() => import("./Messages"))

export { LazyHome, LazySignup, LazyLogIn, LazyProfile , LazyMessages};