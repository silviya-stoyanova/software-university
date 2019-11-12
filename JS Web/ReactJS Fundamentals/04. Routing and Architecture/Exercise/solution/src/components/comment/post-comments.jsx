import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../../style/comments.css'

import postService from '../../kinvey/post/post-service'
import commentService from '../../kinvey/comment/comment-service'

class AllComments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            postId: props.props.match.params.postId,
            post: {},
            postComment: {},
            comments: []
        }
    }

    getPostInfo = () => {
        const { postId } = this.state
        const { author, url, title, image, comment, date } = this.state.post

        return (
            <div className="post">
                <div className="col thumbnail">
                    <a href={url}>
                        <img alt="img" src={image} />
                    </a>
                </div>
                <div className="post-content">
                    <div className="title">
                        <a href={url}> {title} </a>
                    </div>
                    <div className="details">
                        <p>{comment}</p>
                        <div className="info">
                            submitted on {new Date(date).toDateString()} by {author}
                        </div>
                        <div className="controls">
                            <ul>
                                {sessionStorage.getItem('username') === author
                                    ? <Fragment>
                                        <li className="action">
                                            <Link to={`/posts/edit/${postId}`} className="editLink" >edit</Link>
                                        </li>
                                        <li className="action">
                                            <Link to={`/posts/delete/${postId}`} className="deleteLink" >delete</Link>
                                        </li>
                                    </Fragment>
                                    : null}
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="clear"></div>
            </div>
        )
    }

    handleTextareaChange = (event) => {
        const { target } = event
        const { name: key } = target
        const { value } = target

        this.setState({
            postComment: {
                [key]: value
            }
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        // send the postId as well as the author
        const author = sessionStorage.getItem('username')
        const { content } = this.state.postComment
        const { postId } = this.state
        commentService.create(author, content, postId)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    return toast.error(res.description)
                }

                toast.success('Comment sent successfully!')
                this.setState({
                    comments: [...this.state.comments, res],
                })
            })
    }

    render() {
        const { comments } = this.state

        return (
            <section id="viewComments">
                {this.getPostInfo()}

                <div className="post post-content">
                    <form id="commentForm" onSubmit={this.handleFormSubmit}>
                        <label>Comment</label>
                        <textarea onChange={this.handleTextareaChange} name="content" type="text"></textarea>
                        <input type="submit" value="Add Comment" id="btnPostComment" />
                    </form>
                </div>

                {comments.map(comment => {
                    // only the author of the comment can delete it
                    return (
                        <article className="post post-content" key={comment._id}>
                            <p>{comment.content}</p>
                            <div className="info">
                                submitted on {new Date(comment._kmd.ect).toDateString()} by {comment.author} |
                                {
                                    sessionStorage.getItem('username') === comment.author
                                        ? <Link to={`/posts/comments/delete/${comment._id}`} className="deleteLink">delete</Link>
                                        : null
                                }
                            </div>
                        </article>
                    )
                })}
            </section>
        )
    }

    async componentDidMount() {
        const postDetails = await postService
            .loadPostDetails(this.state.postId)
            .then(res => res.json())

        if (postDetails.error) {
            return toast.error(postDetails.description)
        }

        let comments = await commentService.loadAllComments().then(res => res.json())
        if (comments.error) {
            return toast.error(comments.description)
        }
        comments = comments.filter(comment => comment.postId === this.state.postId)

        this.setState(prevState => ({
            post: {
                author: postDetails.author,
                url: postDetails.url,
                title: postDetails.title,
                image: postDetails.image,
                comment: postDetails.comment,
                date: postDetails._kmd.ect
            },
            comments: comments
        }))
    }
}

export default AllComments