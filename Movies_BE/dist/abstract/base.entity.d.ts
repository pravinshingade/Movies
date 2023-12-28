export declare abstract class BaseEntity {
    created_at: Date;
    updated_at: Date;
}
export declare abstract class BaseEntityWithId extends BaseEntity {
    id: string;
}
