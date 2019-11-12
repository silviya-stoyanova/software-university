import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import PostService from '../../kinvey/post/post-service'

class EditPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            postId: null,
            author: null,
            url: '',
            title: '',
            image: '',
            comment: '',
            isEditted: false
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
        const { postId, author, url, title, image, comment } = this.state

        if (sessionStorage.getItem('username') !== author) {
            return toast.error('You are not authorized to edit this link!')
        }

        if (!postId || !author || !url || !title) {
            return toast.error('You must provide a valid author, url and title of the link!')
        }

        PostService.edit(postId, author, url, title, image, comment)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    return toast.error(res.description)
                }
                toast.success('Successfully editted post!')
                this.setState({ isEditted: true })
            })
            .catch(err => toast.error(err.description))
    }

    render() {
        return (
            <section id="viewEdit">
                {this.state.isEditted
                    ? <Redirect to='/posts/all' />
                    : null}

                <div className="submitArea">
                    <h1>Edit Link</h1>
                    <p>Please, fill out the form. A thumbnail image/comment is not required.</p>
                </div>

                <div className="submitArea formContainer">
                    <form onSubmit={this.handleFormSubmit} id="editPostForm" className="submitForm">
                        <label>Link URL:</label>
                        <input onChange={this.handleInputChange} name="url" type="text" value={this.state.url} />

                        <label>Link Title:</label>
                        <input onChange={this.handleInputChange} name="title" type="text" value={this.state.title} />

                        <label>Link Thumbnail Image (optional):</label>
                        <input onChange={this.handleInputChange} name="image" type="text" value={this.state.image} />

                        <label>Comment (optional):</label>
                        <textarea onChange={this.handleInputChange} name="comment" value={this.state.comment}></textarea>

                        <input id="btnEditPost" type="submit" value="Edit Post" />
                    </form>
                </div>
            </section>
        )
    }

    componentDidMount() {
        const { postId } = this.props.props.match.params
        PostService.loadPostDetails(postId)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    return toast.error(res.description)
                }
                if (sessionStorage.getItem('username') !== res.author) {
                    return toast.error('You are not authorized to edit this link!')
                }

                this.setState(prevState => ({
                    postId: res._id,
                    author: res.author,
                    url: res.url,
                    title: res.title,
                    image: res.image,
                    comment: res.comment,
                }))
            })
    }
}

export default EditPost