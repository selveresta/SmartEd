// user-service/src/models/userProfile.ts
import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "./user.model";

@Table({
	tableName: "user_profiles",
})
export class UserProfile extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	userId!: number;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	firstName?: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	lastName?: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	bio?: string;
}

