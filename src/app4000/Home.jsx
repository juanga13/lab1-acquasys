import React, { Component, Fragment } from 'react'

class Home extends Component {
    render() {
        return (
            <Fragment>
                <h3>Welcome to Acquasys!</h3>
                {(this.props.loggedIn) ? <h5>Estas logeado</h5> : <h5>No estas logeado</h5>}
            </Fragment>
        )
    }
}

export default Home;