import React, { Component } from 'react'
import { toast } from 'react-toastify'

import postService from '../../kinvey/post/post-service'
import PostDetails from './details-post'

class MyPosts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }
    }

    render = () => (
        <section id="viewMyPosts">
            <div className="post post-content">
                <h1>Your Posts</h1>
            </div>
            <div className="posts">

                {this.state.posts.length > 0
                    ? this.state.posts.map((post, index) => (
                        <PostDetails post={post} index={index} key={post._id} />
                    ))
                    : toast.info('Loading....', { autoClose: 500 })
                }
            </div>
        </section>
    )

    componentDidMount() {
        let myPosts
        postService.loadAllPosts()
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    return toast.error(res.description)
                }
                myPosts = res.filter(post => post.author === sessionStorage.getItem('username'))

                this.setState(prevState => ({
                    posts: myPosts
                }))
            })
    }
}

export default MyPosts