import React from 'react';
import ReactDOM from 'react-dom'
import fetcher from '../../fetcher'
import Details from './Details'
const CHARS_URL = '/roster'

export default class Rooster extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        const images =
            this.props.characters.map(char => (
                <img src={char.url} alt="charImage"
                    onClick={() => this.props.select(char.id)}
                    className="roster-image" key={char.id} />
            ))

        return (
            <section id="roster">
                <div className="roster-image-container">
                    {images}
                </div>
            </section>
        )
    }
}