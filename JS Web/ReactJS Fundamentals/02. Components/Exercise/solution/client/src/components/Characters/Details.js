import React from 'react';
// import fetcher from '../../fetcher'
// const IMAGE_URL = '/character/'

export default class Details extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => (
        <section id="bio">
            <div className="image">
                <img src={this.props.charDetails.url} alt="charDetails" />
            </div>
            <div className="info">
                <p> <strong>Name:</strong> {this.props.charDetails.name}</p>
                <p> <strong>Bio:</strong> {this.props.charDetails.bio}</p>
            </div>
        </section>
    )
}