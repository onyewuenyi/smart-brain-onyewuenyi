import React, {Component} from 'react';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName: '',
      registerEmail: '',
      registerPassword: '',

    }
  }


  // UI component logic
  onNameChange = (event) => { this.setState({registerName: event.target.value})}


  onEmailChange = (event) => { this.setState({registerEmail: event.target.value})}


  onPasswordChange = (event) => { this.setState({registerPassword: event.target.value})}


  onSubmitRegister = () => {
    // send fetch req
    const postReq =   {
        method: 'post',
        headers: {'Content-TYpe': 'application/json'},
        body: JSON.stringify({
          name: this.state.registerName,
          email: this.state.registerEmail,
          password: this.state.registerPassword
        })
    }

    const sendRegisterData = async (url) => {
      const response = await fetch(url, postReq);
      const user = await response.json();
      if(user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    }

    sendRegisterData('https://floating-citadel-19731.herokuapp.com/register');

  }


  render() {
    const {onRouteChange} = this.props
    return(
    // Add boundary box with Tachyons cards
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            {/* Name */}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={this.onNameChange}
              />
            {/* Email */}
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                 name="email-address"
                 id="email-address"
                 onChange={this.onEmailChange}
               />
            {/* Password */}
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.onPasswordChange}
              />
            </div>

          </fieldset>
          <div className="">
            <input
              onClick={this.onSubmitRegister}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>
        </div>
      </main>
    </article>

  );
  }
}
export default Register
