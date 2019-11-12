import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import postService from '../../kinvey/post/post-service'

class SubmitPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            author: sessionStorage.getItem('username'),
            url: null,
            title: null,
            image: null,
            comment: null,
            isFormSubmitted: false
        }
    }

    handleInputChange = (event) => {
        event.preventDefault()
        const { target } = event
        const { name: key } = target
        const { value } = target

        this.setState(prevState => ({
            [key]: value
        }))
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        let { author, url, title, image, comment } = this.state
        const urlPattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

        if (!url || url.trim().length === 0 || !url.match(urlPattern)) {
            return toast.error('Please provide a valid URL!')
        } else if (!title || title.trim().length === 0) {
            return toast.error('Please provide a valid link title!')
        }

        if (!image) {
            image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNdTSiT8gaC9EOEs43h5IJWWhS2q6OG6AIsX3JaDHMhD_AypoKxg'
        }
        if (url.startsWith('www.')) {
            url = url.replace('www.', 'http://')
        }

        postService.create(author, url, title, image, comment)
            .then(res => {
                if (res.error) {
                    return toast.error(res.description)
                }

                toast.success('Post created successfully!')

                this.setState(prevState => ({
                    isFormSubmitted: true
                }))
            })
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.isFormSubmitted
                        ? <Redirect to='/posts/all' />
                        : null
                }
                <section id="viewSubmit">
                    <div className="submitArea">
                        <h1>Submit Link</h1>
                        <p>Please, fill out the form. A thumbnail image is not required.</p>
                    </div>

                    <div className="submitArea formContainer">
                        <form id="submitForm" className="submitForm" onSubmit={this.handleFormSubmit}>
                            <label>Link URL:</label>
                            <input onChange={this.handleInputChange} name="url" type="text" />

                            <label>Link Title:</label>
                            <input onChange={this.handleInputChange} name="title" type="text" />

                            <label>Link Thumbnail Image (optional):</label>
                            <input onChange={this.handleInputChange} name="image" type="text" />

                            <label>Comment (optional):</label>
                            <textarea onChange={this.handleInputChange} name="comment"></textarea>

                            <input id="btnSubmitPost" value="Submit" type="submit" />
                        </form>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default SubmitPost