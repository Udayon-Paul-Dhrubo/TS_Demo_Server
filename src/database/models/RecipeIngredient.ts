import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

import { Recipe, Ingredient } from '.'

//many to many relationship
interface I_RecipeIngredient {
    id              : number;
    RecipeId        : number;
    IngredientId    : number;

    // timestamps
    createdAt?      : Date;
    updatedAt?      : Date;
    deletedAt?      : Date;
}

export interface I_RecipeIngredientInput extends Optional<I_RecipeIngredient, 'id'> {}
export interface I_RecipeIngredientOutput extends Required<I_RecipeIngredient> {}

class RecipeIngredient extends Model<I_RecipeIngredient, I_RecipeIngredientInput> implements I_RecipeIngredient {
    public id!              : number;
    public RecipeId!        : number;
    public IngredientId!    : number;

    // timestamps
    public createdAt!       : Date;
    public updatedAt!       : Date;
    public deletedAt!       : Date;
}

RecipeIngredient.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        RecipeId: {
            type: DataTypes.INTEGER,
            references : {
                model : Recipe,
                key : 'id'
            }
        },
        IngredientId: {
            type: DataTypes.INTEGER ,
            references : {
                model : Ingredient,
                key : 'id'
            }
        }
    },
    {
        sequelize: sequelizeConnection,
    })

Recipe.belongsToMany( Ingredient, 
    { 
        through: RecipeIngredient 
    });

Ingredient.belongsToMany( Recipe,
    {
        through: RecipeIngredient
    });

export default RecipeIngredient;