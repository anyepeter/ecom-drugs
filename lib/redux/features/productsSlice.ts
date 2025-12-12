import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { Product, Category } from '@prisma/client'

// Types
export interface ProductsState {
  items: Product[]
  filteredItems: Product[]
  loading: boolean
  error: string | null
  currentCategory: Category | 'all' | null
}

// Initial state
const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  currentCategory: null,
}

// Async thunks - now calling API routes instead of server actions
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const response = await fetch('/api/products')
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const products = await response.json()
    return products
  }
)

export const fetchFlowersProducts = createAsyncThunk(
  'products/fetchFlowers',
  async () => {
    const response = await fetch('/api/products?category=flowers')
    if (!response.ok) {
      throw new Error('Failed to fetch flowers')
    }
    const products = await response.json()
    return products
  }
)

export const fetchNonFlowerProducts = createAsyncThunk(
  'products/fetchNonFlower',
  async () => {
    const response = await fetch('/api/products?category=nonflower')
    if (!response.ok) {
      throw new Error('Failed to fetch non-flower products')
    }
    const products = await response.json()
    return products
  }
)

export const fetchBulkProducts = createAsyncThunk(
  'products/fetchBulk',
  async () => {
    const response = await fetch('/api/products?category=bulk')
    if (!response.ok) {
      throw new Error('Failed to fetch bulk products')
    }
    const products = await response.json()
    return products
  }
)

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category: Category | 'all') => {
    const url = category === 'all'
      ? '/api/products'
      : `/api/products?category=${category}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const products = await response.json()
    return products
  }
)

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.items = []
      state.filteredItems = []
      state.error = null
    },
    filterByCategory: (state, action: PayloadAction<Category | 'all'>) => {
      state.currentCategory = action.payload
      if (action.payload === 'all') {
        state.filteredItems = state.items
      } else {
        state.filteredItems = state.items.filter(
          (product) => product.category === action.payload
        )
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch all products
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.filteredItems = action.payload
        state.currentCategory = 'all'
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products'
      })

    // Fetch flowers products
    builder
      .addCase(fetchFlowersProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFlowersProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.filteredItems = action.payload
        state.currentCategory = 'flowers'
      })
      .addCase(fetchFlowersProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch flowers'
      })

    // Fetch non-flower products
    builder
      .addCase(fetchNonFlowerProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNonFlowerProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.filteredItems = action.payload
        state.currentCategory = 'nonflower'
      })
      .addCase(fetchNonFlowerProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch non-flower products'
      })

    // Fetch bulk products
    builder
      .addCase(fetchBulkProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBulkProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.filteredItems = action.payload
        state.currentCategory = 'bulk'
      })
      .addCase(fetchBulkProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch bulk products'
      })

    // Fetch by category
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.filteredItems = action.payload
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products'
      })
  },
})

export const { clearProducts, filterByCategory } = productsSlice.actions
export default productsSlice.reducer
