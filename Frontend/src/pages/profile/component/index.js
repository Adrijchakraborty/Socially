import React from "react"

const LazyPostComponent = React.lazy(() => import("./PostComponent"))
const LazyFollowerComponent = React.lazy(() => import("./FollowerComponent"))
const LazyFollowingComponent = React.lazy(() => import("./FollowingComponent"))

export {LazyFollowerComponent, LazyFollowingComponent,LazyPostComponent}