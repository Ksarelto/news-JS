export const ErrorMessage = {
    NO_CALLBACK: 'No callback for GET response',
    SERVER_ERROR: (status: number, text: string): string => `Sorry, but there is ${status} error: ${text}`,
};
