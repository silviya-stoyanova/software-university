import React from 'react';
import Rooster from './Rooster';
import Details from './Details';
import fetcher from '../../fetcher';

const ROOSTER_ENPOINT = '/roster';
const DETAILS_ENDPOINT = '/character/';

export default class Characters extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            characters: [],
            charDetails: {}
        }

        this.loadCharacters = this.loadCharacters.bind(this)
        this.renderDetails = this.renderDetails.bind(this)
    }

    loadCharacters = () => {
        fetcher.get(ROOSTER_ENPOINT,
            (res) => {
                this.setState({
                    characters: res
                })
            })
    }

    renderDetails = (id) => {
        fetcher
            .get(DETAILS_ENDPOINT + id,
                (res) => {
                    this.setState({
                        charDetails: res
                    })
                })
    }

    render = () => (
        <div>
            <Rooster characters={this.state.characters} select={this.renderDetails} />
            <Details charDetails={this.state.charDetails} />
        </div>
    )

    componentDidMount() {
        this.loadCharacters()
    }
}