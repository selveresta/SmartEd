// user-service/src/controllers/userProfileController.ts
import { Request, Response } from "express";
import { UserProfile } from "@smarted/shared";

export class UserProfileController {
	public async getProfile(req: Request, res: Response): Promise<void> {
		const { userId } = req.params;
		try {
			const profile = await UserProfile.findOne({ where: { userId } });
			if (!profile) {
				res.status(404).json({ error: "Profile not found" });
				return;
			}
			res.json(profile);
		} catch (error) {
			res.status(500).json({ error: "Failed to retrieve profile" });
		}
	}

	public async updateProfile(req: Request, res: Response): Promise<void> {
		const { userId } = req.params;
		const { firstName, lastName, bio } = req.body;
		try {
			const [updated] = await UserProfile.update({ firstName, lastName, bio }, { where: { userId } });
			if (!updated) {
				res.status(404).json({ error: "Profile not found" });
				return;
			}
			res.json({ message: "Profile updated successfully" });
		} catch (error) {
			res.status(500).json({ error: "Failed to update profile" });
		}
	}
}
