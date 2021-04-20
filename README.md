# HTTP Request Form
Submits GET and POST requests using the HTML Forms

## Usage

```javascript
import { HttpRequestForm } from 'http-request-form'

const requestForm = new HttpRequestForm({
  url: 'http://example.com',
  method: 'POST',
  query: { foo: '123' },
  body: { bar: '321' }
})

requestForm.submit()
```
