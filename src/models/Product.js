import mongoose from "mongoose"; // ES6

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    starRating: {
        type: String
    },
    imageUrl: {
        type: String
    }
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
// ES6 Approach