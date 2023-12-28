import * as jwt from 'jsonwebtoken';
export declare abstract class BaseService {
    protected __getBadRequestError(message: string): void;
    protected _getInternalServerError(message: string): void;
    protected _getForbiddenError(message: string): void;
    protected _getNotFoundError(message: string): void;
    protected _decodeUserToken(authorization: any): string | jwt.JwtPayload;
}
