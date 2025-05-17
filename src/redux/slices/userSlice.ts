import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as authService from "@/services/auth";
import * as usersService from "@/services/users";
import {
  User,
  UserSettings,
  UserSubscription,
  UserProfile,
} from "@/types/user";

// Define the state interface
interface UserState {
  user: User | null;
  profile: UserProfile | null;
  settings: UserSettings | null;
  subscription: UserSubscription | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isVerifying: boolean;
  theme: "light" | "dark" | "system";
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    autoSave: boolean;
    editorViewMode: "basic" | "advanced";
  };
}

// Initial state
const initialState: UserState = {
  user: null,
  profile: null,
  settings: null,
  subscription: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isVerifying: true,
  theme: "system",
  preferences: {
    notifications: true,
    emailUpdates: false,
    autoSave: true,
    editorViewMode: "basic",
  },
};

// Async thunks
export const login = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const user = await authService.login(email, password);
      return user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Login failed"
      );
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (
    {
      email,
      password,
      name,
    }: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const user = await authService.register(email, password, name);
      return user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Registration failed"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return true;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Logout failed"
      );
    }
  }
);

export const verifyAuth = createAsyncThunk(
  "user/verifyAuth",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Authentication verification failed"
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const profile = await usersService.getUserProfile(userId);
      return profile;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch user profile"
      );
    }
  }
);

export const fetchUserSettings = createAsyncThunk(
  "user/fetchUserSettings",
  async (userId: string, { rejectWithValue }) => {
    try {
      const settings = await usersService.getUserSettings(userId);
      return settings;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch user settings"
      );
    }
  }
);

export const fetchUserSubscription = createAsyncThunk(
  "user/fetchUserSubscription",
  async (userId: string, { rejectWithValue }) => {
    try {
      const subscription = await usersService.getUserSubscription(userId);
      return subscription;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch user subscription"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (
    {
      userId,
      profileData,
    }: { userId: string; profileData: Partial<UserProfile> },
    { rejectWithValue }
  ) => {
    try {
      const updatedProfile = await usersService.updateUserProfile(
        userId,
        profileData
      );
      return updatedProfile;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update user profile"
      );
    }
  }
);

export const updateUserSettings = createAsyncThunk(
  "user/updateUserSettings",
  async (
    {
      userId,
      settingsData,
    }: { userId: string; settingsData: Partial<UserSettings> },
    { rejectWithValue }
  ) => {
    try {
      const updatedSettings = await usersService.updateUserSettings(
        userId,
        settingsData
      );
      return updatedSettings;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to update user settings"
      );
    }
  }
);

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set theme preference
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload;
      if (state.settings) {
        state.settings.theme = action.payload;
      }
    },

    // Update user preferences
    updatePreferences: (
      state,
      action: PayloadAction<Partial<UserState["preferences"]>>
    ) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      };
    },

    // Set editor view mode
    setEditorViewMode: (state, action: PayloadAction<"basic" | "advanced">) => {
      state.preferences.editorViewMode = action.payload;
    },

    // Clear error message
    clearError: (state) => {
      state.error = null;
    },

    // Update user details locally (without API call)
    updateUserDetails: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Handle registration
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Handle logout
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.profile = null;
        state.settings = null;
        state.subscription = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Handle auth verification
    builder
      .addCase(verifyAuth.pending, (state) => {
        state.isVerifying = true;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.isVerifying = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.isVerifying = false;
        state.isAuthenticated = false;
      });

    // Handle fetch user profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Handle fetch user settings
    builder
      .addCase(fetchUserSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
        state.theme = action.payload.theme || state.theme;
      })
      .addCase(fetchUserSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Handle fetch user subscription
    builder
      .addCase(fetchUserSubscription.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subscription = action.payload;
      })
      .addCase(fetchUserSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Handle update user profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Handle update user settings
    builder
      .addCase(updateUserSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
        state.theme = action.payload.theme || state.theme;
      })
      .addCase(updateUserSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  setTheme,
  updatePreferences,
  setEditorViewMode,
  clearError,
  updateUserDetails,
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
