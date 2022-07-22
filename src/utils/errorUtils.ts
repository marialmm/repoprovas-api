type AppError = "unauthorized" | "conflict";

export interface Error {
    type: AppError;
    message: string;
}

export function errorTypeToStatusCode(type: AppError) {
    if (type === "unauthorized") return 401;
    if (type === "conflict") return 409;
}

export function conflictError(message?: string): Error {
    return {
        type: "conflict",
        message,
    };
}
