import React from 'react'

//  component with no state = pure function = pre component
const Navigation = ({onRouteChange, isSignedIn}) => {
    // This component contains the nav routing functionality
    // passing in an object to style attribute
    // bc this is a js object you have to use CamelCase anytime you have to use a dash
        //inline style: object literal inlined in the prop value
        if(isSignedIn) {
          return (
            <nav style={{display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
          )
        }
        else {
          return (
            <nav style={{display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
          )

        }
}
export default Navigation
