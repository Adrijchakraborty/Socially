import React from "react";
import Home from "./Home";
const LazySignup = React.lazy(() => import("./Signup"))
const LazyLogIn = React.lazy(() => import("./Login"))

export { Home, LazySignup, LazyLogIn};