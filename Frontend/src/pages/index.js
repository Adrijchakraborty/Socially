import React from "react";
const LazyHome = React.lazy(() => import("./Home"))
const LazySignup = React.lazy(() => import("./Signup"))
const LazyLogIn = React.lazy(() => import("./Login"))
const LazyProfile = React.lazy(() => import("./Profile"))
const LazyMessages = React.lazy(() => import("./Messages"))
const LazySearch = React.lazy(() => import("./Search"))
const LazyViewPost = React.lazy(() => import("./ViewPost"))

export { LazyHome, LazySignup, LazyLogIn, LazyProfile , LazyMessages, LazySearch,LazyViewPost};