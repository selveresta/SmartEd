// resource-service/src/controllers/resourceController.ts
import { Request, Response } from "express";
import { Resource } from "@smarted/shared";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, process.env.STORAGE_PATH!);
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		cb(null, `${uuidv4()}${ext}`);
	},
});

const upload = multer({ storage });

export class ResourceController {
	public async addResource(req: Request, res: Response): Promise<void> {
		const { userId, title, description, type, category } = req.body;
		const file = req.file;
		if (!file) {
			res.status(400).json({ error: "File is required" });
			return;
		}
		try {
			const resource = await Resource.create({
				userId,
				title,
				description,
				type,
				path: file.path,
				category,
			});
			res.status(201).json(resource);
		} catch (error) {
            console.log(error.message)
			res.status(500).json({ error: "Failed to add resource" });
		}
	}

	public async getResources(req: Request, res: Response): Promise<void> {
		const { userId } = req.params;
		try {
			const resources = await Resource.findAll({ where: { userId } });
			res.json(resources);
		} catch (error) {
			res.status(500).json({ error: "Failed to retrieve resources" });
		}
	}

	public async updateResource(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const { title, description, type, category } = req.body;
		try {
			const [updated] = await Resource.update({ title, description, type, category }, { where: { id } });
			if (!updated) {
				res.status(404).json({ error: "Resource not found" });
				return;
			}
			res.json({ message: "Resource updated successfully" });
		} catch (error) {
			res.status(500).json({ error: "Failed to update resource" });
		}
	}

	public async deleteResource(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		try {
			const resource = await Resource.findByPk(id);
			if (!resource) {
				res.status(404).json({ error: "Resource not found" });
				return;
			}
			fs.unlinkSync(resource.path);
			await Resource.destroy({ where: { id } });
			res.json({ message: "Resource deleted successfully" });
		} catch (error) {
			res.status(500).json({ error: "Failed to delete resource" });
		}
	}

	public uploadMiddleware() {
		return upload.single("file");
	}
}
