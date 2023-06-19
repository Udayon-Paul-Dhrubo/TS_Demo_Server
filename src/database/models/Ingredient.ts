import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config'

interface I_Ingredient {
    id              : number;
    name            : string;
    description?    : string;
    foodGroup?      : string;

    // timestamps
    createdAt?      : Date;
    updatedAt?      : Date;
    deletedAt?      : Date;
}

export interface I_IngredientInput extends Optional<I_Ingredient, 'id'> {}

export interface I_IngredientOutput extends Required<I_Ingredient> {}

class Ingredient extends Model<I_Ingredient, I_IngredientInput> implements I_Ingredient {
    public id!              : number;
    public name!            : string;
    public description!     : string;
    public foodGroup!       : string;

    // timestamps
    public createdAt!       : Date;
    public updatedAt!       : Date;
    public deletedAt!       : Date;
}

Ingredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,   // A string field has a limit of 255 characters, 
                                    //a text field has a character limit of 30,000 characters.
        },
        foodGroup: {
            type: DataTypes.STRING,
        }
    }, 
    {
        sequelize: sequelizeConnection,
        paranoid: true,
    })

export default Ingredient;