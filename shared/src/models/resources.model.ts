// resource-service/src/models/resource.ts
import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { User } from "./user.model";

@Table({
	tableName: "resources",
})
export class Resource extends Model {
	@Column({
		type: DataType.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	})
	id!: string;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	userId!: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	title!: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	description?: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	type!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	path!: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	category?: string;
}
