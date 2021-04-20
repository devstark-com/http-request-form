const { FormDataJson } = require('form-data-json-convert')

export class HttpRequestForm {
  constructor ({
    url = '',
    method = 'GET',
    query = {},
    body = {},
    form
  } = {}) {
    this.url = url
    this.method = method
    this.query = query
    this.body = body
    this.form = form || document.createElement('form')
    this.form.method = this.method
    this.populateForm()
  }

  populateForm () {
    const urlObj = new URL(this.url)
    const searchParamsObj = new URLSearchParams(urlObj.search)

    const queryFlattened = FormDataJson.flattenJsonFormValues(this.query)
    Object.entries(queryFlattened).forEach(([name, value]) => {
      searchParamsObj.set(name, value)
    })

    // GET requests keep all search params in URL
    // while GET requests suppose to have no search params and keep the query params in form data

    if (this.method === 'POST') {
      urlObj.search = searchParamsObj.toString()

      const bodyFlattened = FormDataJson.flattenJsonFormValues(this.body)
      Object.entries(bodyFlattened).forEach(([name, value]) => {
        this.setFormField(name, value)
      })
    } else {
      urlObj.search = ''
      searchParamsObj.forEach((value, name) => {
        this.setFormField(name, value)
      })
    }

    this.form.action = urlObj.toString()
  }

  setFormField (name, value) {
    let field
    try {
      field = this.form.querySelector(`input[name=${name}]`)
    } catch (e) {
      field = null
    }
    if (!field) {
      field = document.createElement('input')
      field.type = 'hidden'
      field.name = name
      this.form.appendChild(field)
    }
    field.value = value
  }

  submit () {
    if (!document.body.contains(this.form)) {
      document.body.appendChild(this.form)
    }
    this.form.submit()
  }
}
