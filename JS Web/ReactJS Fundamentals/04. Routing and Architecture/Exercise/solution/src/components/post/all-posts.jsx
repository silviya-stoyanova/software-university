import React, { Component } from 'react'
import { toast } from 'react-toastify'

import postService from '../../kinvey/post/post-service'
import PostDetails from './details-post'

class AllPosts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            username: sessionStorage.getItem('username')
        }
    }

    render = () => (
        <section id="viewCatalog">
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
        postService.loadAllPosts()
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    return toast.error(res.description)
                }

                this.setState(prevState => ({
                    posts: res
                }))
            })
    }
}

export default AllPosts