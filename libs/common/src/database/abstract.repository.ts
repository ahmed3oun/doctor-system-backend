import { Logger } from "@nestjs/common";
import { AbstractDocument } from "./abstract.schema";
import { Connection, Model, SaveOptions } from "mongoose";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {

    protected abstract readonly logger: Logger;

    constructor(
        private readonly model: Model<TDocument>,
        private readonly connection: Connection
    ) { }

    async create(
        document: Omit<TDocument, '_id'>,
        options?: SaveOptions
    ) {

    }
}