import React from "react";

const useFormValues = (initialValues) => {
  const [values, setValues] = React.useState(initialValues);

  return [
    values,
    (e) => setValues({ ...values, [e.target.name]: e.target.value }),
  ];
};
