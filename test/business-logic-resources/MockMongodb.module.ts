import { DynamicModule, Module } from "@nestjs/common";
import { CircuitBreakerModule } from "../../src/common-resources-mongodb/module-circuit-breaker/CircuitBreaker.module";
import { I_CRUD } from "../../src/common-resources-mongodb/module-mongodb/Crud.interface";
import { CrudService } from "../../src/common-resources-mongodb/module-mongodb/Crud.service";
import { I_MONGO_DB } from "../../src/common-resources-mongodb/module-mongodb/Mongodb.interface";
import { UtilitiesModule } from "../../src/common-resources-mongodb/module-utilities/Utilities.module";
import { WinstonLoggerModule } from "../../src/common-resources-mongodb/module-winston-logger/WinstonLogger.module";
import { MockMongodbService } from "./MockMongodb.service";


@Module({})
export class MockMongodbModule{
    static register(): DynamicModule {
        return{
            module: MockMongodbModule,
            imports: [
                WinstonLoggerModule.register(),
                UtilitiesModule.register(),
                CircuitBreakerModule.register(),
            ],
            providers: [
                {
                    useClass: MockMongodbService,
                    provide: I_MONGO_DB,
                },
                {
                    useClass: CrudService,
                    provide: I_CRUD,
                }
            ],
            exports: [
                {
                    useClass: CrudService,
                    provide: I_CRUD,
                }
            ]
        }
    }
}