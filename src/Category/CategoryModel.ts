import mongoose, { Document, Model, Schema } from "mongoose";

interface CategoryInterface extends Document {
    parent?: mongoose.Types.ObjectId | null
    name: string,
    alias: string,
    isActive: boolean
}

const categorySchema = new mongoose.Schema<CategoryInterface>({
    parent: { type: mongoose.Types.ObjectId, ref: "tbl_catgories", default: null },
    name: {
        type: String,
        required: [true, "Required field name is empty!"],
        minlength: [2, "Name should be at least 2 characters"]
    },
    alias: {
        type: String,
        required: [true, "Required field alias is empty!"],
        minlength: [2, "Alias should be at least 2 characters"],
        unique: [true, "Alias allready exist!"],
        set: (value: string) => {
            return value.toLowerCase().replace(/\s+/g, "-");
        }
    },
    isActive: { type: Boolean, default: true }
});
export default mongoose.model<CategoryInterface>("tbl_categories", categorySchema);