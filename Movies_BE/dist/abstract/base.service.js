"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
class BaseService {
    __getBadRequestError(message) {
        throw new common_1.BadRequestException({ message });
    }
    _getInternalServerError(message) {
        throw new common_1.InternalServerErrorException({ message });
    }
    _getForbiddenError(message) {
        throw new common_1.ForbiddenException({ message });
    }
    _getNotFoundError(message) {
        throw new common_1.NotFoundException({ message });
    }
    _decodeUserToken(authorization) {
        try {
            let token = authorization.slice(7);
            const decodeToken = jwt.decode(token);
            return decodeToken;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ error });
        }
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map