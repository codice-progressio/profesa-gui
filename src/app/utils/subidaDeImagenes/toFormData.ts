export function toFormData<T>(formValue: T) {
  const formData = new FormData()

  for (const key of Object.keys(formValue)) {
    const value = formValue[key]
    const isFile = value instanceof File

    if (isFile) {
      formData.append(key, value)
      continue
    }

    try {
      formData.append(key, JSON.stringify(value))
    } catch (error) {
      formData.append(key, value)
    }
  }

  return formData
}
