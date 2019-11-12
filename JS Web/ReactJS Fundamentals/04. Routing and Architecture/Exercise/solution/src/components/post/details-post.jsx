import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

class PostDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAuthor: sessionStorage.getItem('username') === this.props.post.author
        }
    }

    render = () => (
        <article className="post" key={this.props.key}>
            <div className="col rank">
                <span>{this.props.index + 1}</span>
            </div>
            <div className="col thumbnail">
                <a href={this.props.post.url}>
                    <img alt="img" src={this.props.post.image} />
                </a>
            </div>
            <div className="post-content">
                <div className="title">
                    <a href={this.props.post.url}>
                        {this.props.post.title}
                    </a>
                </div>
                <div className="details">
                    <div className="info">
                        submitted on {(new Date(this.props.post._kmd.ect).toDateString())} by {this.props.post.author}
                    </div>
                    <div className="controls">
                        <ul>
                            <li className="action">
                                <Link to={`/posts/comments/${this.props.post._id}`} className="commentsLink">
                                    comments
                                    </Link>
                            </li>

                            {
                                this.state.isAuthor
                                    ? <Fragment>
                                        <li className="action">
                                            <Link to={`/posts/edit/${this.props.post._id}`} className="editLink">
                                                edit
                                                </Link>
                                        </li>
                                        <li className="action">
                                            <Link to={`/posts/delete/${this.props.post._id}`} className="deleteLink">
                                                delete
                                                </Link>
                                        </li>
                                    </Fragment>
                                    : null
                            }
                        </ul>
                    </div>

                </div>
            </div>
            <div className="clear"></div>
        </article>
    )
}

export default PostDetails