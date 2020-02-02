/* inorder to fetch data from the firebase database we need axios
 run npm install --save axios */

import React, { Component } from 'react';
import PropTypes from 'prop-types';


// bring in materil-ui grid
import Grid from '@material-ui/core/Grid';

// components
import Scream from "../components/Scream";
import Profile from '../components/Profile';


import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class home extends Component {
    // return screams in component's state
    componentDidMount() {
        this.props.getScreams();
    }

    render() {
        const { screams, loading } = this.props.data;
        let recentScreamsMarkup = !loading ? (
            screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
        ) : ( <p>Loading ...</p> );
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        );
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getScreams})(home);