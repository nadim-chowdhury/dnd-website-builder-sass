import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Import slices
import builderSlice from "./slices/builderSlice";
import projectsSlice from "./slices/projectsSlice";
import templatesSlice from "./slices/templatesSlice";
import userSlice from "./slices/userSlice";

// Import middleware
import { apiMiddleware } from "./middlewares/api";
import { loggerMiddleware } from "./middlewares/logger";
import { persistenceMiddleware } from "./middlewares/persistence";

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
        // Ignore these action types for serializability checks
        ignoredActions: ["builder/updateComponentDom"],
        // Ignore these paths in the state
        ignoredPaths: ["builder.domRefs"],
      },
    }).concat(apiMiddleware, loggerMiddleware, persistenceMiddleware),
});

// Define types for Redux hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed versions of the useDispatch and useSelector hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
