// src/controllers/authController.ts
import { User, UserProfile } from "@smarted/shared";
import bcrypt from "bcrypt";
import TokenService from "../services/tokenService";
import { Request, Response } from "express";

class AuthController {
	constructor() {}

	public async register(req: Request, res: Response): Promise<void> {
		const { username, password } = req.body;
		try {
			if (!username || !password) {
				throw new Error("Wrong data");
			}

			const existingUser = await User.findOne({ where: { username } });
			if (existingUser) {
				res.status(409).json({ error: "User already exists" });
				return;
			}

			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await User.create({ username, password: hashedPassword });
			const profile = await UserProfile.create({ userId: user.id });
			const token = TokenService.generateToken(username, hashedPassword);
			res.status(201).json({ token });
		} catch (error) {
			console.log(error.message);
			res.status(500).json({ error: "Registration failed" });
		}
	}

	private async comparePassword(candidatePassword: string, password: string) {
		return bcrypt.compare(candidatePassword, password);
	}

	public login = async (req: Request, res: Response): Promise<void> => {
		const { username, password } = req.body;
		try {
			const user = await User.findOne({ where: { username } });
			const compare = await this.comparePassword(password, user.password);
			if (!user || !compare) {
				res.status(401).json({ error: "Invalid credentials" });
				return;
			}
			const token = TokenService.generateToken(username, user.password);
			res.json({ token });
		} catch (error) {
			console.log(error.message);

			res.status(500).json({ error: "Login failed" });
		}
	};

	public authenticate(req: Request, res: Response, next: Function): void {
		const token = req.header("Authorization")?.replace("Bearer ", "");
		if (!token) {
			res.status(401).json({ error: "No token provided" });
			return;
		}
		try {
			const decoded = TokenService.verifyToken(token);
			if (decoded) {
				res.json({ message: "Profile data", user: decoded });
			}
		} catch (error) {
			res.status(401).json({ error: "Invalid token" });
		}
	}
}

export default new AuthController();
