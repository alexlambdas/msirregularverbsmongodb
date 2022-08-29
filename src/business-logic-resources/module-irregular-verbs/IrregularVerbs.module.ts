import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TransactionIdService } from "src/common-resources-mongodb/middleware/TransactionId.service";
import { MongodbModule } from "src/common-resources-mongodb/module-mongodb/Mongodb.module";
import { UtilitiesModule } from "src/common-resources-mongodb/module-utilities/Utilities.module";
import { WinstonLoggerModule } from "src/common-resources-mongodb/module-winston-logger/WinstonLogger.module";
import { ConfigAppService } from "./ConfigApp.service";
import { IrregularVerbsController } from "./IrregularVerbs.controller";
import { IrregularVerbsService } from "./IrregularVerbs.service";

@Module({
    imports: [
        UtilitiesModule.register(),
        WinstonLoggerModule.register(),
        MongodbModule.register(),
    ],
    providers: [
        IrregularVerbsService,
        ConfigAppService,
    ],
    controllers: [IrregularVerbsController]
})
export class IrregularVerbsModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TransactionIdService)
            .forRoutes(IrregularVerbsController)
    }

}