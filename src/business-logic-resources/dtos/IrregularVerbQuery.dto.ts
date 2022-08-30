import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class IrregularVerbQueryDto{

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    baseForm?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    pastSimple?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    pastParticiple?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    traduction?: string;
}