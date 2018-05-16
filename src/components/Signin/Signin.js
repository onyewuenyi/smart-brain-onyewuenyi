import React, {Component} from 'react';


class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: ""
    }
  }
onEmailChange
onPasswordChange
onSubmitSignIn
  // Methods
  onEmailChange =  (event) => this.setState({signInEmail: event.target.value});

  onPasswordChange = (event) => this.setState({signInPassword: event.target.value});

  onSubmitSignIn = () => {
    // if I send "" email and password then it will not match a user
    // in my database and send a Bad Request status code, which is the route res
    const sendSignInData = async (url) => {
      const response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      });
      const user = await response.json();
      // if the res from the sever is 'success' then change the route to the
      // home page
      if(user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    }

    sendSignInData('https://floating-citadel-19731.herokuapp.com/signin');

  }
  // onRouteChange - event handler that changes the page
  // Change the page whenever the user a submit event occurs on the input route
  render() {
    const {onRouteChange} = this.props;
    return (
      // Add boundary box with Tachyons cards
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              {/* Email input bar component */}
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
              </div>
              {/* Email bar component  */}
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
              </div>
            </fieldset>
            <div className="">
              <input
                id="route"
                  onClick={this.onSubmitSignIn}
                // onClick={() => onRouteChange('home')}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
            </div>
            <div className="lh-copy mt3">
              <p onClick={()=> onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>

    );
  }
}
export default Signin
