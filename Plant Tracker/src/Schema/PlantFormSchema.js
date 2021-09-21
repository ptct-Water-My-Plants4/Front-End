import * as yup from "yup";

export default yup.object().shape({
  id: yup
    .string()
    .required("Plant id required"),

  nickname: yup.string().required("Plant Name required")
  .min(3, "name must be at least 3 characters"),
  h20frequency: yup
    .string()
    .required("Select a watering frequency")
    .oneOf(
      [
        "Daily",
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

