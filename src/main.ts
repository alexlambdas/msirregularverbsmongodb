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
            This microservice let us perform crud operations in mongodb database. All operations are listed below.
			Irregular verbs are the model object that we have chosen.
            
            Verbs && Operations

                1) "GET_ALL"
				2) "GET_BY_ID"
				3) "GET_BY_PARAMS"
				4) "POST"        
				5) "DELETE_ONE"
				6) "UPDATE_ONE"                           
        `)
        .setVersion('1.0')
        .addTag('@alexlambdas')
        .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api-docs/app/rs/portfolio/msirregularverbsmongodb/crud', app, document);


	/**
	 * 
	 * @author alexLambdas
	 * @description
	 * 
	 */
	await app.listen(3000);
}
bootstrap();
