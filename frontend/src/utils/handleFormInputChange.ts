export default function handleFormInputChange<T extends Record<string, any>>(
  formData: T,
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
): T {
  const { name, value, multiple } = event.target;

  if (multiple && Array.isArray(formData[name])) {
    const currentValues = formData[name];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((id) => id !== value)
      : [...currentValues, value];

    return {
      ...formData,
      [name]: newValues,
    };
  }

  return {
    ...formData,
    [name]: value,
  };
}
