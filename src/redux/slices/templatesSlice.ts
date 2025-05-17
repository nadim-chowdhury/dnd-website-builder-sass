import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { templatesService } from "@/services/templates";
import { Template, TemplateCategory } from "@/types/template";

// Define the state interface
interface TemplatesState {
  templates: Template[];
  filteredTemplates: Template[];
  categories: TemplateCategory[];
  selectedTemplate: Template | null;
  selectedCategory: string | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: TemplatesState = {
  templates: [],
  filteredTemplates: [],
  categories: [],
  selectedTemplate: null,
  selectedCategory: null,
  searchQuery: "",
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchTemplates = createAsyncThunk(
  "templates/fetchTemplates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await templatesService.getTemplates();
      return response.templates; // Extract templates array from TemplateResponse
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch templates"
      );
    }
  }
);

export const fetchTemplateById = createAsyncThunk(
  "templates/fetchTemplateById",
  async (id: string, { rejectWithValue }) => {
    try {
      const template = await templatesService.getTemplateById(id);
      return template;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch template"
      );
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "templates/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const categories = await templatesService.getTemplateCategories();
      return categories;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch categories"
      );
    }
  }
);

// Create the slice
const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    // Select a template
    selectTemplate: (state, action: PayloadAction<string>) => {
      const templateId = action.payload;
      state.selectedTemplate =
        state.templates.find((template) => template.id === templateId) || null;
    },

    // Clear selected template
    clearSelectedTemplate: (state) => {
      state.selectedTemplate = null;
    },

    // Filter templates by category
    filterByCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;

      if (action.payload === null) {
        state.filteredTemplates = state.templates;
      } else {
        state.filteredTemplates = state.templates.filter(
          (template) => template.categoryId === action.payload
        );
      }

      // Apply any existing search filter as well
      if (state.searchQuery) {
        state.filteredTemplates = state.filteredTemplates.filter(
          (template) =>
            template.name
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase()) ||
            template.description
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase())
        );
      }
    },

    // Set search query and filter templates
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;

      // Start with category filtered templates or all templates
      let filtered = state.selectedCategory
        ? state.templates.filter(
            (template) => template.categoryId === state.selectedCategory
          )
        : [...state.templates];

      // Apply search filter
      if (action.payload) {
        filtered = filtered.filter(
          (template) =>
            template.name
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            template.description
              .toLowerCase()
              .includes(action.payload.toLowerCase())
        );
      }

      state.filteredTemplates = filtered;
    },

    // Clear all filters
    clearFilters: (state) => {
      state.selectedCategory = null;
      state.searchQuery = "";
      state.filteredTemplates = state.templates;
    },
  },

  extraReducers: (builder) => {
    // Handle fetchTemplates
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.templates = action.payload;
        state.filteredTemplates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Handle fetchTemplateById
    builder
      .addCase(fetchTemplateById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTemplateById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedTemplate = action.payload;
      })
      .addCase(fetchTemplateById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Handle fetchCategories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  selectTemplate,
  clearSelectedTemplate,
  filterByCategory,
  setSearchQuery,
  clearFilters,
} = templatesSlice.actions;

// Export reducer
export default templatesSlice.reducer;
