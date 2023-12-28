"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieRecord = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../../abstract/base.entity");
const users_entity_1 = require("../../auth/entity/users.entity");
const typeorm_1 = require("typeorm");
let MovieRecord = class MovieRecord extends base_entity_1.BaseEntityWithId {
};
exports.MovieRecord = MovieRecord;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'title' }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, default: null }),
    __metadata("design:type", String)
], MovieRecord.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'publishingYear' }),
    (0, typeorm_1.Column)({ type: 'varchar', default: null }),
    __metadata("design:type", String)
], MovieRecord.prototype, "publishingYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'poster' }),
    (0, typeorm_1.Column)({ type: 'bytea', nullable: true }),
    __metadata("design:type", Buffer)
], MovieRecord.prototype, "poster", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'users' }),
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, {
        nullable: true,
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", String)
], MovieRecord.prototype, "users", void 0);
exports.MovieRecord = MovieRecord = __decorate([
    (0, typeorm_1.Entity)()
], MovieRecord);
//# sourceMappingURL=movie.entity.js.map