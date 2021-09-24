import * as yup from "yup";

export default yup.object().shape({

  nickname: yup.string().required("Plant Name required")
  .min(3, "name must be at least 3 characters"),
  h2oFrequency: yup
    .string()
    .required("Select a watering frequency")
    .oneOf(
      [
        "daily",
        "every other day",
        "weekly",
        "twice a week",
        "biweekly",
        "monthly",
      ],
      "Select a watering frequency category"
    ),
  species: yup.string().required("species required"),
});

