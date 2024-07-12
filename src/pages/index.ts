import { lazy } from "react";

const LazyHome = lazy(() => import("./HomePage"));
const LazyKorzinka = lazy(() => import("./KorzinkaPage"));

export { LazyHome, LazyKorzinka };
