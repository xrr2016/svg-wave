import React, { Component } from 'react'
import validator from 'validator'
import PropTypes from 'prop-types'
import { Form, Button, Message } from 'semantic-ui-react'
import AppInlineError from '../messages/AppInlineError'

class AppLoginForm extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  }

  onChange = e =>
    this.setState({
      errors: {},
      data: { ...this.state.data, [e.target.name]: e.target.value }
    })

  onSubmit = e => {
    e.preventDefault()
    const errors = this.validte(this.state.data)
    this.setState({ errors })
    if (!Object.keys(errors).length) {
      this.setState({ loading: true })
      this.props.submit(this.state.data).catch(err =>
        this.setState({
          errors: err.response.data.errors,
          loading: false
        })
      )
    }
  }

  validte = data => {
    const errors = {}
    if (!validator.isEmail(data.email)) errors.email = '无效的邮箱地址。'
    if (!data.password) errors.password = '密码不能为空。'
    return errors
  }

  render() {
    const { data, errors, loading } = this.state
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <AppInlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="your password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <AppInlineError text={errors.password} />}
        </Form.Field>
        <Button floated="right" loading={loading} primary>
          登录
        </Button>
      </Form>
    )
  }
}

AppLoginForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default AppLoginForm
