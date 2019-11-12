import React from 'react';
import fetcher from '../../fetcher';
const IMAGE_URL = '/episodePreview/';

export default class Slider extends React.Component {
    constructor(params) {
        super(params)

        this.state = {
            episodeId: 0,
            imageUrl: "https://i.imgur.com/B31Uwkm.png"
        }

        this.showEpisode = this.showEpisode.bind(this)
    }

    showEpisode = function (type) {
        let episodeId = this.state.episodeId
        let imageUrl

        type === 'next'
            ? episodeId === 2 ? episodeId = 0 : episodeId++
            : episodeId === 0 ? episodeId = 2 : episodeId--

        fetcher.get(IMAGE_URL + episodeId, (res) => {
            imageUrl = res.url

            this.setState({
                episodeId,
                imageUrl
            })
        })
    }

    render = () => (
        <div>
            <div className="warper">
                <img className="slider-elem slider-button button case-left" src="/left.png" onClick={() => this.showEpisode('prev')} title="previous" alt="nav" />
                <img src={this.state.imageUrl} alt="episode" className="sliderImg slider-elem" />
                <img className="slider-elem slider-button button case-right" src="/right.png" onClick={() => this.showEpisode('next')} title="previous" alt="nav" />
            </div>
        </div>
    );
}