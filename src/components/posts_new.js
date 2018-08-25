import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createPost } from '../actions'

class PostsNew extends React.Component {
  renderField = (field) => {
    const {
      input,
      label,
      type,
      meta: { touched, error }
    } = field

    const style = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={style}>
        <label>{label}</label>
        <input
          className="form-control"
          type="text"
          {...input}
          />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit = values => {
    this.props.createPost(values, () => {
      this.props.history.push('/')
    })
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
          />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
          />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
          />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.title) {
    errors.title = 'Enter a title!'
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories!'
  }
  if (!values.content) {
    errors.content = 'Enter some content!'
  }

  return errors
}


export default reduxForm({
  form: 'PostsNewForm',
  validate
})(
  connect(null, { createPost })(PostsNew)
)
