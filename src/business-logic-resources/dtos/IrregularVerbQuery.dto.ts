import { IsNotEmpty, IsOptional } from "class-validator";

export class IrregularVerbQueryDto{

    @IsOptional()
    @IsNotEmpty()
    baseForm?: string;

    @IsOptional()
    @IsNotEmpty()
    pastSimple?: string;

    @IsOptional()
    @IsNotEmpty()
    pastParticiple?: string;

    @IsOptional()
    @IsNotEmpty()
    traduction?: string;
}