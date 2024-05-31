// src/services/tokenService.ts
import jwt from "jsonwebtoken";

class TokenService {
	public generateToken(username: string, hashedPassword: string): string {
		const payload = { username, hashedPassword };
		return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
	}

	public verifyToken(token: string): any {
		try {
			return jwt.verify(token, process.env.JWT_SECRET!);
		} catch (error) {
			throw new Error("Invalid token");
		}
	}
}

export default new TokenService();
