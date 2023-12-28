/// <reference types="node" />
import { BaseEntityWithId } from "src/abstract/base.entity";
export declare class MovieRecord extends BaseEntityWithId {
    title: string;
    publishingYear: string;
    poster: Buffer;
    users: string;
}
