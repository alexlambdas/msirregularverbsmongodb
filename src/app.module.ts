import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IrregularVerbsModule } from './business-logic-resources/module-irregular-verbs/IrregularVerbs.module';


@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		IrregularVerbsModule
	],
	providers: [],
})
export class AppModule { }
