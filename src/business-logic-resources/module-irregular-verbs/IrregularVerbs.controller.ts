import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request } from "express";
import { LoggerDto } from "src/common-resources-mongodb/dtos/Logger.dto";
import { MongodbMetaDataDto } from "src/common-resources-mongodb/dtos/MongodbMetaData.dto";
import { ResponseDeleteDto } from "src/common-resources-mongodb/dtos/ResponseDelete.dto";
import { VerbEnumDto } from "src/common-resources-mongodb/dtos/VerbEnum.dto";
import { CustomHttpExceptionFilter } from "src/common-resources-mongodb/exceptions/CustomHttpExceptionFilter";
import { UtilitiesService } from "src/common-resources-mongodb/module-utilities/Utilities.service";
import { WinstonLoggerService } from "src/common-resources-mongodb/module-winston-logger/WinstonLogger.service";
import { IrregularVerbDto } from "../dtos/IrregularVerb.dto";
import IrregularVerbsModel from "../schemas/IrregularVerbsModel.schema";
import { ConfigAppService } from "./ConfigApp.service";
import { IrregularVerbsService } from "./IrregularVerbs.service";


/**
 * 
 * @author alexLambdas
 * @description
 * 
 */
@Controller("/app/rs/portfolio/msirregularverbsmongodb/crud")
export class IrregularVerbsController{

    constructor(
        private util: UtilitiesService,
        private winston: WinstonLoggerService,
        private configApp: ConfigAppService,
        private irregularVerbsService: IrregularVerbsService){}


    
    @Get("/GET_ALL")
    @UseFilters(CustomHttpExceptionFilter)
    @UsePipes(ValidationPipe)
    public async getAll(@Req() requestExpress: Request): Promise<IrregularVerbDto[]>{

        //
        let timeInit: number = 0;
        let timeEnd: number = 0;
        let requestUrl = requestExpress.url.toString();
        let transactionId = String(requestExpress.headers.transactionid);
        let mongodbMetaData: MongodbMetaDataDto;
        let response: IrregularVerbDto[];
        let loggerDto: LoggerDto;

        //
        mongodbMetaData = {
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            backEndUrl: this.configApp.getUrlMongodb(),
            timeout: this.configApp.getTimeOutMongoDb(),
            timeoutCircuitBreaker: this.configApp.getTimeOutCircuitBreaker(),
            uuidv4: transactionId,
            verb: VerbEnumDto.GET_ALL,
            mongooseModel: IrregularVerbsModel,
            urlApi: requestUrl,
            dbUsername: this.configApp.getUserMongodb(),
            dbPassword: this.configApp.getPasswordMongodb(),
            dbServerSelectionTimeoutMS: this.configApp.getTimeOutMongoDb(),
        };

        //
        timeInit = new Date().getTime();
        response = JSON.parse(await this.irregularVerbsService.crudMongodb(mongodbMetaData));
        timeEnd = new Date().getTime();

        //
        if(response.length === 0) response = [...response, {
            baseForm: undefined, 
            pastSimple: undefined,
            pastParticiple: undefined,
            traduction: undefined,
        }];

        //
        loggerDto = {
            type: this.configApp.loggerInfo(),
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            verb: mongodbMetaData.verb.toString(),
            transactionId: transactionId,
            level: undefined, // 
            layer: this.configApp.controllerLayer(),
            message: this.configApp.successMessage(),
            processingTime: this.util.fnGetProcessingTime(timeEnd, timeInit),
            timestamp: this.util.fnGetTimeZone(),
            urlApi: mongodbMetaData.urlApi,
            request: mongodbMetaData.urlApi,
            response: JSON.stringify(response),
        };
        this.winston.audit(loggerDto);

        //
        return response;
    }


    @Get("/GET_BY_ID/:id")
    @UseFilters(CustomHttpExceptionFilter)
    @UsePipes(ValidationPipe)
    public async getById(@Req() requestExpress: Request, @Param("id") id: string): Promise<IrregularVerbDto>{

        //
        let timeInit: number = 0;
        let timeEnd: number = 0;
        let requestUrl = requestExpress.url.toString();
        let transactionId = String(requestExpress.headers.transactionid);
        let mongodbMetaData: MongodbMetaDataDto;
        let response: IrregularVerbDto;
        let loggerDto: LoggerDto;

        //
        mongodbMetaData = {
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            backEndUrl: this.configApp.getUrlMongodb(),
            timeout: this.configApp.getTimeOutMongoDb(),
            timeoutCircuitBreaker: this.configApp.getTimeOutCircuitBreaker(),
            uuidv4: transactionId,
            verb: VerbEnumDto.GET_BY_ID,
            mongooseModel: IrregularVerbsModel,
            urlApi: requestUrl,
            dbUsername: this.configApp.getUserMongodb(),
            dbPassword: this.configApp.getPasswordMongodb(),
            dbServerSelectionTimeoutMS: this.configApp.getTimeOutMongoDb(),
            mongooseId: id,
        };

        //
        timeInit = new Date().getTime();
        response = JSON.parse(await this.irregularVerbsService.crudMongodb(mongodbMetaData));
        timeEnd = new Date().getTime();
        
        //
        if(response === null){
            response = {
                baseForm: undefined, 
                pastSimple: undefined,
                pastParticiple: undefined,
                traduction: undefined,
            }
        }
        

        //
        loggerDto = {
            type: this.configApp.loggerInfo(),
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            verb: mongodbMetaData.verb.toString(),
            transactionId: transactionId,
            level: undefined, // 
            layer: this.configApp.controllerLayer(),
            message: this.configApp.successMessage(),
            processingTime: this.util.fnGetProcessingTime(timeEnd, timeInit),
            timestamp: this.util.fnGetTimeZone(),
            urlApi: mongodbMetaData.urlApi,
            request: mongodbMetaData.urlApi,
            response: JSON.stringify(response),
        };
        this.winston.audit(loggerDto);

        //
        return response;
    }

    @Post("/POST")
    @UseFilters(CustomHttpExceptionFilter)
    @UsePipes(ValidationPipe)
    public async postOne(@Req() requestExpress: Request, @Body() bodyDto: IrregularVerbDto): Promise<IrregularVerbDto>{

        //
        let timeInit: number = 0;
        let timeEnd: number = 0;
        let requestUrl = requestExpress.url.toString();
        let transactionId = String(requestExpress.headers.transactionid);
        let mongodbMetaData: MongodbMetaDataDto;
        let response: IrregularVerbDto;
        let loggerDto: LoggerDto;

        //
        mongodbMetaData = {
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            backEndUrl: this.configApp.getUrlMongodb(),
            timeout: this.configApp.getTimeOutMongoDb(),
            timeoutCircuitBreaker: this.configApp.getTimeOutCircuitBreaker(),
            uuidv4: transactionId,
            verb: VerbEnumDto.POST_ONE,
            mongooseModel: IrregularVerbsModel,
            urlApi: requestUrl,
            dbUsername: this.configApp.getUserMongodb(),
            dbPassword: this.configApp.getPasswordMongodb(),
            dbServerSelectionTimeoutMS: this.configApp.getTimeOutMongoDb(),
            body: JSON.stringify(bodyDto),
        };

        //
        timeInit = new Date().getTime();
        response = JSON.parse(await this.irregularVerbsService.crudMongodb(mongodbMetaData));
        timeEnd = new Date().getTime();

        //
        loggerDto = {
            type: this.configApp.loggerInfo(),
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            verb: mongodbMetaData.verb.toString(),
            transactionId: transactionId,
            level: undefined, // 
            layer: this.configApp.controllerLayer(),
            message: this.configApp.successMessage(),
            processingTime: this.util.fnGetProcessingTime(timeEnd, timeInit),
            timestamp: this.util.fnGetTimeZone(),
            urlApi: mongodbMetaData.urlApi,
            request: mongodbMetaData.body,
            response: JSON.stringify(response),
        };
        this.winston.audit(loggerDto);

        //
        return response;
    }

    @Delete("/DELETE_ONE/:id")
    @UseFilters(CustomHttpExceptionFilter)
    @UsePipes(ValidationPipe)
    public async delOne(@Req() requestExpress: Request, @Param("id") id: string): Promise<ResponseDeleteDto>{

        //
        let timeInit: number = 0;
        let timeEnd: number = 0;
        let requestUrl = requestExpress.url.toString();
        let transactionId = String(requestExpress.headers.transactionid);
        let mongodbMetaData: MongodbMetaDataDto;
        let response: ResponseDeleteDto;
        let loggerDto: LoggerDto;

        //
        mongodbMetaData = {
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            backEndUrl: this.configApp.getUrlMongodb(),
            timeout: this.configApp.getTimeOutMongoDb(),
            timeoutCircuitBreaker: this.configApp.getTimeOutCircuitBreaker(),
            uuidv4: transactionId,
            verb: VerbEnumDto.DELETE_ONE,
            mongooseModel: IrregularVerbsModel,
            urlApi: requestUrl,
            dbUsername: this.configApp.getUserMongodb(),
            dbPassword: this.configApp.getPasswordMongodb(),
            dbServerSelectionTimeoutMS: this.configApp.getTimeOutMongoDb(),
            mongooseId: id,
        };

        //
        timeInit = new Date().getTime();
        response = JSON.parse(await this.irregularVerbsService.crudMongodb(mongodbMetaData));
        timeEnd = new Date().getTime();
        
        //
        loggerDto = {
            type: this.configApp.loggerInfo(),
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            verb: mongodbMetaData.verb.toString(),
            transactionId: transactionId,
            level: undefined, // 
            layer: this.configApp.controllerLayer(),
            message: this.configApp.successMessage(),
            processingTime: this.util.fnGetProcessingTime(timeEnd, timeInit),
            timestamp: this.util.fnGetTimeZone(),
            urlApi: mongodbMetaData.urlApi,
            request: mongodbMetaData.urlApi,
            response: JSON.stringify(response),
        };
        this.winston.audit(loggerDto);

        //
        return response;
    }


    @Put("UPDATE_ONE/:id")
    @UseFilters(CustomHttpExceptionFilter)
    @UsePipes(ValidationPipe)
    public async updateOne(@Req() requestExpress: Request, @Param("id") id: string, @Body() bodyDto: IrregularVerbDto): Promise<IrregularVerbDto>{

        //
        let timeInit: number = 0;
        let timeEnd: number = 0;
        let requestUrl = requestExpress.url.toString();
        let transactionId = String(requestExpress.headers.transactionid);
        let mongodbMetaData: MongodbMetaDataDto;
        let response: IrregularVerbDto;
        let loggerDto: LoggerDto;

        //
        mongodbMetaData = {
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            backEndUrl: this.configApp.getUrlMongodb(),
            timeout: this.configApp.getTimeOutMongoDb(),
            timeoutCircuitBreaker: this.configApp.getTimeOutCircuitBreaker(),
            uuidv4: transactionId,
            verb: VerbEnumDto.UPDATE_ONE,
            mongooseModel: IrregularVerbsModel,
            urlApi: requestUrl,
            dbUsername: this.configApp.getUserMongodb(),
            dbPassword: this.configApp.getPasswordMongodb(),
            dbServerSelectionTimeoutMS: this.configApp.getTimeOutMongoDb(),
            body: JSON.stringify(bodyDto),
            mongooseId: id,
        };

        //
        timeInit = new Date().getTime();
        response = JSON.parse(await this.irregularVerbsService.crudMongodb(mongodbMetaData));
        timeEnd = new Date().getTime();

        //
        loggerDto = {
            type: this.configApp.loggerInfo(),
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            verb: mongodbMetaData.verb.toString(),
            transactionId: transactionId,
            level: undefined, // 
            layer: this.configApp.controllerLayer(),
            message: this.configApp.successMessage(),
            processingTime: this.util.fnGetProcessingTime(timeEnd, timeInit),
            timestamp: this.util.fnGetTimeZone(),
            urlApi: mongodbMetaData.urlApi,
            request: mongodbMetaData.body,
            response: JSON.stringify(response),
        };
        this.winston.audit(loggerDto);

        //
        return response;
    }
    
}