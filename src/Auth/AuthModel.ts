import mongoose, { Document } from "mongoose";

interface AuthInterface extends Document {
    firstName: string,
    lastName: string,
    phone: string,
    password: string,
}

const AuthSchema = new mongoose.Schema<AuthInterface>({
    firstName: {
        type: String,
        required: [true, "Required field firstname is empty!"],
        minlength: [2, "Firstname should be at least 2 characters long"]
    },
    lastName: {
        type: String,
        required: [true, "Required field lastname is empty!"],
        minlength: [2, "Lastname should be at least 2 characters long"]
    },
    phone: {
        type: String,
        required: [true, "Required field phone is empty!"],
        minlength: [10, "Phone number must be 10 digits"],
        maxlength: [10, "Phone number must be 10 digits"],
        unique:[true, "Phone number allready exist!"],
        match: [/^[0-9]{10}$/, "Please enter valid 10 digit phone number"]
    },
    password: {
        type: String,
        required: [true, "Required field password is empty"]
    }
}, {
    timestamps: true
})

export default mongoose.model<AuthInterface>("tbl_users", AuthSchema)