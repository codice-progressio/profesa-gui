export function toFormData<T>(formValue: T) {
  const formData = new FormData()

  for (const key of Object.keys(formValue)) {
    const value = formValue[key]

    const isFile =  value instanceof File 

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

  console.log(formData.get('organigrama'))

  return formData
}

const stringConstructor = 'test'.constructor
const arrayConstructor = [].constructor
const objectConstructor = {}.constructor

function whatIsIt(object) {
  if (object === null) {
    return 'null'
  }
  if (object === undefined) {
    return 'undefined'
  }
  if (object.constructor === stringConstructor) {
    return 'String'
  }
  if (object.constructor === arrayConstructor) {
    return 'Array'
  }
  if (object.constructor === objectConstructor) {
    return 'Object'
  }
  {
    return "don't know"
  }
}
