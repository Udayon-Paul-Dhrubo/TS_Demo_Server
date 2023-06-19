import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config'
import {I_IngredientInput} from './Ingredient'

interface I_Recipe {
    id              : number;
    title           : string;
    instructions?   : string;
    author?         : string;

    // timestamps
    createdAt?      : Date;
    updatedAt?      : Date;
    deletedAt?      : Date;
}

export interface I_RecipeInput extends Optional<I_Recipe, 'id'> {
    ingredients?    : I_IngredientInput[];
}

export interface I_RecipeOutput extends Required<I_Recipe> {}

class Recipe extends Model<I_Recipe, I_RecipeInput> implements I_Recipe {
    public id!              : number;
    public title!           : string;
    public instructions!    : string;
    public author!          : string;

    // timestamps
    public createdAt!       : Date;
    public updatedAt!       : Date;
    public deletedAt!       : Date;
}

Recipe.init(
    {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title : {
            type : DataTypes.STRING,
            allowNull: false
        },
        instructions : {
            type : DataTypes.TEXT,       
        },
        author : {
            type : DataTypes.STRING,
        }       

    },
    {
        sequelize: sequelizeConnection,
        paranoid: true,
    });

export default Recipe;