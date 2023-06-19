require('dotenv').config()
import createError from 'http-errors'

import { Recipe, RecipeTag, Tag, Review, Ingredient, RecipeIngredient } from './models'


const isDev = process.env.NODE_ENV === 'development'


const dbInit = () => Promise.all([
    Tag.sync({ alter: isDev }),
    Ingredient.sync({ alter: isDev }),
    Recipe.sync({ alter: isDev }),
    Review.sync({ alter: isDev }),
    RecipeTag.sync({ alter: isDev }),
    RecipeIngredient.sync({ alter: isDev }),
])
.then(() => {
    console.log('Database connected')
})
.catch((err) => {
    console.log(err)
    throw createError(500, err.message)
})

export default dbInit 