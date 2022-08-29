import { Inject, Injectable } from "@nestjs/common";
import { MongodbMetaDataDto } from "src/common-resources-mongodb/dtos/MongodbMetaData.dto";
import { CrudInterface, I_CRUD } from "src/common-resources-mongodb/module-mongodb/Crud.interface";

@Injectable()
export class IrregularVerbsService{

    constructor(@Inject(I_CRUD) private mongodb: CrudInterface){}

    public async crudMongodb(mongodbMetaData: MongodbMetaDataDto): Promise<string>{

        //
        let response: string;
        response = await this.mongodb.crud(mongodbMetaData);
        return response;
    }
}