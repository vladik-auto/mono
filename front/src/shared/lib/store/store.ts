import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from '@shared/lib';
import { eventSlice } from '@entities/event';
import { authSlice } from '@features/auth';

export const store = configureStore({
    reducer: {
        [mainApi.reducerPath]: mainApi.reducer,
        auth: authSlice.reducer,
        event: eventSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mainApi.middleware),
    devTools: true,
});
