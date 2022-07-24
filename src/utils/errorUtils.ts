type AppError = "badRequest" | "unauthorized" | "notFound" | "conflict";

export interface Error {
    type: AppError;
    message: string;
}

export function errorTypeToStatusCode(type: AppError) {
    if (type === "badRequest") return 400;
    if (type === "unauthorized") return 401;
    if (type === "notFound") return 404;
    if (type === "conflict") return 409;
}

export function badRequestError(message?: string) {
    return {
        type: "badRequest",
        message,
    };
}

export function unauthorizedError(message?: string): Error {
    return {
        type: "unauthorized",
        message,
    };
}

export function notFoundError(message?: string): Error {
    return {
        type: "notFound",
        message,
    };
}

export function conflictError(message?: string): Error {
    return {
        type: "conflict",
        message,
    };
}
