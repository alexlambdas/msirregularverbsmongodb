import { CustomHttpHandlerException } from "../../src/common-resources-mongodb/exceptions/CustomHttpHandlerException";
import { CreateDbConnectionDto } from "../../src/common-resources-mongodb/dtos/CreateDbConnection.dto";
import { MongodbInterface } from "../../src/common-resources-mongodb/module-mongodb/Mongodb.interface";
import { okDelById, okGetAll, okGetById, okGetByParams, okUpdateById } from "./MockMongodbResponses.spec";
import { IrregularVerbDto } from "../../src/business-logic-resources/dtos/IrregularVerb.dto";


export class MockMongodbService implements MongodbInterface{

    async customGetConnection(dbUrl: string, createDbConnectionDto: CreateDbConnectionDto): Promise<any> {
        
    }

    async customCloseConnection(): Promise<any> {
        
    }

    async customFind(mongooseModel: any): Promise<string> {
        return JSON.stringify(okGetAll);
    }

    async customFindByParams(mongooseModel: any, paramsObjectDto: string): Promise<string> {
        let params: IrregularVerbDto = JSON.parse(paramsObjectDto);
        if(params.baseForm === "blow"){
            return JSON.stringify(okGetByParams);
        }
    }

    async customFindOne(bodyDto: string, mongooseModel: any): Promise<string> {
        let irregularVerbDto: IrregularVerbDto = JSON.parse(bodyDto);
        if(irregularVerbDto.baseForm === "build"){
            return bodyDto;
        }
        else{
            return "null";
        }
    }

    async customFindById(id: string, mongooseModel: any): Promise<string> {
        try{

            switch(id){
                case("630bfc8bc221367c6deae074"):{
                    return JSON.stringify(okGetById);
                }
                default:{
                    throw new Error(`no se encontro el id ${id}`);
                }
            }
        }
        catch(errCustomFindOne){
            switch(id){
                case("630bfc8bc221367c6deae001"): {
                    throw new CustomHttpHandlerException({ code: 500, description: errCustomFindOne});
                }
                case("630bfc8bc221367c6deae002"): {
                    throw new CustomHttpHandlerException({ code: 403, description: errCustomFindOne});
                }
                default: throw new CustomHttpHandlerException({ code: 400, description: errCustomFindOne});
            }

        }
    }

    async customSave(bodyDto: string, mongooseModel: any): Promise<string> {
        return JSON.stringify(bodyDto);
    }

    async customDeleteOne(id: string, mongooseModel: any): Promise<string> {
        return JSON.stringify(okDelById);
    }

    async customUpdateOne(id: string, bodyDto: string, mongooseModel: any): Promise<string> {
        return JSON.stringify(okUpdateById);
    }

}