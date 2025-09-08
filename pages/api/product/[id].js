import { dbConnect } from "@/lib/db";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    const { id } = req.query;
    await dbConnect();
    if (req.method === 'GET') {
        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error: error.message });
        }
    }
    else if (req.method === "PUT") {
        try {
            const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
                new: true, // return updated document instead of original
                runValidators: true // schema validations are applied during udpate
            })

            if (!updateProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product updated successfully', data: updateProduct });
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error: error.message });
        }
    }
    else if (req.method === "DELETE") {
        try {
            const deleteProduct = await Product.findByIdAndDelete(id);
            if (!deleteProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error: error.message });
        }
    }
    else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}