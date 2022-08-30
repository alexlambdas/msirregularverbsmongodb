import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigAppService } from "../../src/business-logic-resources/module-irregular-verbs/ConfigApp.service";
import { IrregularVerbsController } from "../../src/business-logic-resources/module-irregular-verbs/IrregularVerbs.controller";
import { IrregularVerbsService } from "../../src/business-logic-resources/module-irregular-verbs/IrregularVerbs.service";
import { TransactionIdService } from "../../src/common-resources-mongodb/middleware/TransactionId.service";
import { UtilitiesModule } from "../../src/common-resources-mongodb/module-utilities/Utilities.module";
import { WinstonLoggerModule } from "../../src/common-resources-mongodb/module-winston-logger/WinstonLogger.module";

import { MockMongodbModule } from "./MockMongodb.module";

@Module({
    imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
        UtilitiesModule.register(),
        WinstonLoggerModule.register(),
        MockMongodbModule.register(),
	],
    providers: [
        IrregularVerbsService,
        ConfigAppService,
    ],
    controllers: [IrregularVerbsController],
})
export class MockAppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TransactionIdService)
            .forRoutes(IrregularVerbsController)
    }
}