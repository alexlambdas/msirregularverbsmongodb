import { Inject, Injectable } from "@nestjs/common";
import { MongodbMetaDataDto } from "src/common-resources-mongodb/dtos/MongodbMetaData.dto";
import { CrudInterface, I_CRUD } from "src/common-resources-mongodb/module-mongodb/Crud.interface";

@Injectable()
export class IrregularVerbsService{

    constructor(@Inject(I_CRUD) private mongodb: CrudInterface){}

    public async getAll(mongodbMetaData: MongodbMetaDataDto): Promise<string>{

        //
        let responseList: string;
        responseList = await this.mongodb.crud(mongodbMetaData);
        return responseList;
    }

    public async getById(mongodbMetaData: MongodbMetaDataDto): Promise<string>{

        //
        let response: string;
        response = await this.mongodb.crud(mongodbMetaData);
        return response;
    }

    public async postOne(mongodbMetaData: MongodbMetaDataDto): Promise<string>{

        //
        let response: string;
        response = await this.mongodb.crud(mongodbMetaData);
        return response;
    }

    public async delOne(mongodbMetaData: MongodbMetaDataDto): Promise<string>{

        //
        let response: string;
        response = await this.mongodb.crud(mongodbMetaData);
        return response;
    }

    public async updateOne(mongodbMetaData: MongodbMetaDataDto): Promise<string>{

        //
        let response: string;
        response = await this.mongodb.crud(mongodbMetaData);
        return response;
    }

}