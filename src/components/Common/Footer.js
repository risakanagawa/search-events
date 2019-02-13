import React from 'react';
import { Container } from "semantic-ui-react";


export default class Footer extends React.Component {
    render() {
        return (
            <div className='footer'>
                <Container >
                    <h4>© Made by Risa | 2019</h4>
                </Container>
            </div>
        )
    };
}