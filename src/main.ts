import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomHttpExceptionFilter } from './common-resources-mongodb/exceptions/CustomHttpExceptionFilter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

	/**
	 * 
	 * @author alexLambdas
	 * @description
	 * 
	 */
	const app = await NestFactory.create(AppModule);
	app.useGlobalFilters(new CustomHttpExceptionFilter());

	const config = new DocumentBuilder()
        .setTitle('Microservice - MSIrregularVerbsMongodb')
        .setDescription(`
            Crud microservice for Irregular Verbs database in mongodb
            
            Verbs - Operations

                1) "GET_ALL"                  
        `)
        .setVersion('1.0')
        .addTag('alexLambdas')
        .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api-docs/MSIrregularVerbs/microservice/crud', app, document);


	/**
	 * 
	 * @author alexLambdas
	 * @description
	 * 
	 */
	await app.listen(3000);
}
bootstrap();
