import { configureStore, Middleware } from "@reduxjs/toolkit";
import builderSlice from "./slices/builderSlice";
import projectsSlice from "./slices/projectsSlice";
import templatesSlice from "./slices/templatesSlice";
import userSlice from "./slices/userSlice";

// Custom middleware
import { apiMiddleware } from "./middlewares/api";
import { loggerMiddleware } from "./middlewares/logger";
import { persistenceMiddleware } from "./middlewares/persistence";

// Explicitly define middleware array
const customMiddleware: Middleware[] = [
  apiMiddleware,
  loggerMiddleware,
  persistenceMiddleware,
];

// Create store (must be created before inferring RootState or AppDispatch)
export const store = configureStore({
  reducer: {
    builder: builderSlice,
    projects: projectsSlice,
    templates: templatesSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["builder/updateComponentDom"],
        ignoredPaths: ["builder.domRefs"],
      },
    }).concat(...customMiddleware),
});

// Define types for RootState and AppDispatch from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export AppState as an alias of RootState for consistency with existing code
export type AppState = RootState;

export default store;

// src/redux/store.ts

// import { configureStore } from "@reduxjs/toolkit";
// import builderReducer from "./slices/builderSlice";

// export const store = configureStore({
//   reducer: {
//     builder: builderReducer,
//     // Add other reducers here
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore certain paths for non-serializable values
//         ignoredActions: ["builder/updateComponentDomId"],
//         ignoredPaths: ["builder.domRefIds"],
//       },
//     }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;