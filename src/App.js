import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    // initial state of page is sign in
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
  }
}


// Particles configuration
const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 500
            }
        }
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      // initial state of page is sign in
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }


  // functionality
  loadUser = (data) => {
    // user state setter for child components
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }
  // Change the page. This is triggered by an if statement that checks
  // for the value of route property

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
      // need to clear the user object
    }

    else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});

  }


  goToRouteSignin = () => this.setState({route: 'signin'})


  onInputChange = event => {
    // event listener that receives an event
    // update input
    this.setState({input: event.target.value})
  }


  calculateFaceLocation = (data) => {
    const getImageDimensions = element => {
      // Utility function
      // TODO move to my library
      if (element.width !== undefined && element.height !== undefined)
        return [element.width, element.height];
    }

    const clarifaiFaceBoundingBox =  data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector('img#input_image');
    // const width = Number(image.width);
    // const height = Number(image.height);

    const width = getImageDimensions(image)[0];
    const height = getImageDimensions(image)[1];

    // figure out the 4 dots around the face
    // then wrap in a border
    const boundingBox = {
      // this calculation took him 1 hour to compute. Practice with this logic
      // he practiced some math and also looked how clarifai does it
      leftCol: clarifaiFaceBoundingBox.left_col * width,
      topRow: clarifaiFaceBoundingBox.top_row * height,
      rightCol: width - (clarifaiFaceBoundingBox.right_col * width),
      bottomRow: height - (clarifaiFaceBoundingBox.bottom_row * height)
    }
    return boundingBox
  }


  displayFaceBox = (box) => {
    console.log(box);
    this.setState({
      box: box
    });
  }


  onSubmit = event => {
    // Update the picture displayed
    this.setState({imageUrl: this.state.input})

    // Clarifai FaceRecognition API
    // Send image to Clarifai prediction API
    const postReq =   {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
    }
    const putReq =   {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
    }

    fetch('https://floating-citadel-19731.herokuapp.com/imageurl', postReq)
    .then(response => response.json())
    .then(response => {
      if(response) {
        // left 5000 and will come back to
        fetch('https://floating-citadel-19731.herokuapp.com/image', putReq)
          .then(response => response.json())
          .then(count => {
          // update count state va
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }


  // display page UI
  render() {
    // enables cleaner code
    const {isSignedIn, imageUrl, route, box } = this.state;
    return (
        <div className="App">
          <Particles className="particles" params={particlesOptions}/>
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          {
            // if route = signin then render home page: Signin component
            // else render page 2: Face Recognition
            route === 'home' ?
            // Page: Home screen
            // Components:
            // Logo - Box with a image
            // Rank - Box with Text
            // ImageLinkForm - Button and Input
            // FaceRecognition - Box with image
            // Event Handlers:
            // onInputChange
            // onSubmit
            <div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm
                // components: input and button
                // component functions passed
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
            : ( route === 'signin' ?
              // Page: Signin
              // Components:
              // Signin - A input form
              // Events:
              // onRouteChange - Signin event
                <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
              // Page: Register
              // Components:
              // Register - A input form
              // Events:
              // onRouteChange - Register event
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
          }
        </div>
    );
  }
}

export default App;
