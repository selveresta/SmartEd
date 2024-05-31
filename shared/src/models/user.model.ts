import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
	tableName: "users",
})
export class User extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	username: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string;
}
