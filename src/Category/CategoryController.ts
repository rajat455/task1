import { Request, Response } from "express";
import CategoryModel from "./CategoryModel";
import { HttpError } from "../asyncHandeler";

function createTree(categories: any[], parent: string | null = null) {
    let tree: any = []
    categories.forEach((x) => {
        if ((!x.parent && !parent) || (x.parent && x.parent.toString() === parent)) {
            const children = createTree(categories, x._id.toString())
            if (children.length > 0) {
                x.children = children
            }
            tree.push(x)
        }
    })
    return tree

}


class CategoryController {
    async insertCategory(req: Request, res: Response) {
        const { name, alias, parent } = req.body
        const reuslt = await CategoryModel.create({ name, alias, parent: parent || null })
        if (!reuslt) return HttpError(500, "Somthing went wrong!")
        return res.status(200).send({ message: "Success", data:reuslt })
    }

    async updateCategory(req: Request, res: Response) {
        const { id } = req.params
        const result = await CategoryModel.updateOne({ _id: id }, { ...req.body })
        if (!result || result.modifiedCount <= 0) return HttpError(500, "Somthing went wrong!")
        return res.status(200).send({ message: "Success" })
    }

    async deleteCategory(req: Request, res: Response) {
        const { id } = req.params
        let result :any = await CategoryModel.updateMany({ parent: id }, { parent: null })
        if(!result && result.modifiedCount <= 0) return HttpError(500, "Somthing went wrong!")
        result = await CategoryModel.deleteOne({ _id: id })
        if (!result || result.deletedCount <= 0) return HttpError(500, "Somthing went wrong!")
        return res.status(200).send({ message: "Success" })

    }

    async listCategory(req: Request, res: Response) {
        let result = await CategoryModel.find().lean()
        if (!result) return HttpError(500, "Somthing went wrong!")
        result = createTree(result);
        return res.status(200).send({ message: "Success", data: result })
    }
}

const categoryController: CategoryController = new CategoryController()
export default categoryController