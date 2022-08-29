import * as mongoose from "mongoose";

interface IrregularVerbInterfaceSchema extends mongoose.Document {
    baseForm: string,
    pastSimple: string,
    pastParticiple: string,
    traduction: string,
}

const IrregularVerbSchema = new mongoose.Schema(
    {
        baseForm: { type: String, required: true },
        pastSimple: { type: String, required: true },
        pastParticiple: { type: String, required: true },
        traduction: { type: String, required: true },
    },
    {
        collection: "IrregularVerbsCollection"
    }
);

const IrregularVerbsModel = mongoose.model<IrregularVerbInterfaceSchema>("IrregularVerbs", IrregularVerbSchema);

export default IrregularVerbsModel;