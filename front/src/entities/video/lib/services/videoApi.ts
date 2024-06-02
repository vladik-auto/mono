import { mainApi } from '@shared/lib';

export const videoApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        openWebSocket: builder.mutation<null, void>({
            queryFn: (_, { dispatch }) => {
                const socket = new WebSocket(`${import.meta.env.VITE_SERVER_WS}/video/ws/videoinput`);

                socket.onopen = () => {
                    console.log('WebSocket connection opened');
                    // Dispatch any actions if necessary
                };

                socket.onmessage = (event) => {
                    console.log('WebSocket message received:', event.data);
                    // Process the incoming message, dispatch actions, etc.
                };

                socket.onclose = () => {
                    console.log('WebSocket connection closed');
                    // Dispatch any actions if necessary
                };

                socket.onerror = (error) => {
                    console.error('WebSocket error observed:', error);
                    // Handle error
                };

                // Return the socket object for further use
                return { data: null };
            },
        }),
        sendMessage: builder.mutation<void, { socket: WebSocket, message: string }>({
            // @ts-ignore
            queryFn: ({ socket, message }) => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(message);
                    return { data: undefined };
                } else {
                    return { error: { status: 'CUSTOM_ERROR', data: 'WebSocket is not open' } };
                }
            },
        }),
        sendBlob: builder.mutation<void, { socket: WebSocket, blob: Blob }>({
            // @ts-ignore
            queryFn: ({ socket, blob }) => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(blob);
                    return { data: undefined };
                } else {
                    return { error: { status: 'CUSTOM_ERROR', data: 'WebSocket is not open' } };
                }
            },
        }),
    }),
});

export const { useOpenWebSocketMutation, useSendMessageMutation, useSendBlobMutation } = videoApi;
