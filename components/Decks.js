import propTypes from 'prop-types';
import { View } from 'react-native';
import Navigator from './Navigator';
import { addDecks } from '../actions';
import { connect } from 'react-redux';
import React, { Component } from 'react';

/**
 * @description Decks compeonent
 */
class Decks extends Component {
    /**
     * @description Proptypes
     */
    static propTypes = {
        addDecks: propTypes.func.isRequired,
    };

    /**
     * @description Adds the deks to the store when the component mounts
     */
    componentDidMount () {
        this.props.addDecks();
    }

    /**
     * @description renders the component
     */
    render () {
        return (
            <View style={{flex: 1}}>
                <Navigator />
            </View>
        );
    }
}

/**
 * @description Passes the store dispatch method to component props
 * @param {function} dispatch Dispatch method
 * @returns Component props
 */
const mapDispatchToProps = dispatch => {
    return {
        addDecks: () => {
            return dispatch(addDecks());
        },
    };
};

export default connect(null, mapDispatchToProps)(Decks);
