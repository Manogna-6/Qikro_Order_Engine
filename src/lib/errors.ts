/**
 * Shared Typed Errors for Domain & API Service Layer
 */

export class ApplicationError extends Error {
    public readonly code: string;
    public readonly statusCode: number;

    constructor(message: string, code: string = 'INTERNAL_ERROR', statusCode: number = 500) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class NotFoundError extends ApplicationError {
    constructor(entityName: string, id: string) {
        super(`${entityName} with ID '${id}' was not found.`, 'NOT_FOUND', 404);
    }
}

export class InvalidTransitionError extends ApplicationError {
    constructor(currentStatus: string, nextStatus: string) {
        super(
            `Invalid order state transition: Cannot transition from '${currentStatus}' to '${nextStatus}'.`,
            'INVALID_TRANSITION',
            400
        );
    }
}

export class InvalidOtpError extends ApplicationError {
    constructor(message: string = 'Invalid 6-digit OTP code entered. Please try again.') {
        super(message, 'INVALID_OTP', 400);
    }
}

export class OtpExpiredError extends ApplicationError {
    constructor(message: string = 'OTP code has expired. Please request a new code.') {
        super(message, 'OTP_EXPIRED', 400);
    }
}

export class UnauthorizedError extends ApplicationError {
    constructor(message: string = 'Authentication required. Please login with OTP.') {
        super(message, 'UNAUTHORIZED', 401);
    }
}

export class ForbiddenError extends ApplicationError {
    constructor(message: string = 'You do not have permission to access this resource.') {
        super(message, 'FORBIDDEN', 403);
    }
}

export class ValidationError extends ApplicationError {
    constructor(message: string) {
        super(message, 'VALIDATION_ERROR', 422);
    }
}
