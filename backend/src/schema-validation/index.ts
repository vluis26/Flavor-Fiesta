import * as yup from 'yup'

// For Registering or Loging in
const joinSchema = yup.object({
    body: yup.object({
      email: yup.string().email().required("Email is required"),
      password: yup
        .string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
          )
        .required("Password is required"),
    }),
});

interface ICreateRecipe {
    body: {
      title: string;
      cuisine: string;
      ingredients: string;
      description: string;
    };
}
  
const createRecipeSchema: yup.ObjectSchema<ICreateRecipe> = yup.object({
    body: yup.object({
      title: yup.string().required("Title is required"),
      cuisine: yup.string().required("Cuisine is required"),
      ingredients: yup.string().required("Ingredients is required"),
      description: yup.string().required("Description is required"),
    }),
});

const getRecipeSchema = yup.object({
    params: yup.object({
      id: yup.string().min(24).required("invalid request"),
    }),
});

const searchRecipeSchema = yup.object({
    query: yup.object({
      q: yup.string().required("invalid request"),
    }),
});
  
const getUserRecipesSchema = yup.object({
    params: yup.object({
      userId: yup.string().min(24).required("invalid request"),
    }),
});

export { joinSchema, createRecipeSchema, getRecipeSchema, searchRecipeSchema, getUserRecipesSchema }