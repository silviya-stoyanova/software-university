import React, { lazy, Suspense, Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import observer from '../../observer'

import logout from '../user/logout'
import deletePost from '../post/delete'
import deleteComment from '../comment/delete-comment'

const Home = lazy(() => import('../home/home'))
const LoginRegister = lazy(() => import('../user/login-register.jsx'))
const MyPosts = lazy(() => import('../post/my-posts'))
const AllPosts = lazy(() => import('../post/all-posts'))
const AddPost = lazy(() => import('../post/add-post'))
const EditPost = lazy(() => import('../post/edit-post'))
const Comments = lazy(() => import('../comment/post-comments'))

class MyRoutes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogged: !!sessionStorage.getItem('authtoken')
        }

        observer.subscribe('loginUser', this.loginUserRoutes)
        observer.subscribe('logoutUser', this.logoutUserRoutes)
    }

    loginUserRoutes = () => {
        this.setState(prevState => ({
            isLogged: true
        }))
    }

    logoutUserRoutes = () => {
        this.setState(prevState => ({
            isLogged: false
        }))
    }

    render = () => {
        const isLogged = this.state.isLogged

        return (
            <Suspense fallback={<div>Loading...</div>}>

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/user/login-register' render={() => {
                        // component={LoginRegister}
                        return isLogged ? <Redirect to='/' /> : <LoginRegister />
                    }} />
                    <Route path='/user/logout' render={() => {
                        if (isLogged) {
                            logout()
                        }
                        return <Redirect to='/' />
                    }} />

                    <Route path='/posts/all' render={() => {
                        return isLogged ? <AllPosts /> : <Redirect to="/" />
                    }} />
                    <Route path='/posts/add' render={() => {
                        return isLogged ? <AddPost /> : <Redirect to="/" />
                    }} />
                    <Route path='/posts/mine' render={() => {
                        return isLogged ? <MyPosts /> : <Redirect to="/" />
                    }} />

                    <Route path='/posts/edit/:postId' render={(p) => {
                        return isLogged ? <EditPost props={p} /> : <Redirect to='/' />
                    }} />
                    <Route path='/posts/delete/:postId' render={(p) => {
                        deletePost(p)
                        return <Redirect to="/" />
                    }} />

                    <Route exact path='/posts/comments/:postId' render={(p) => {
                        return <Comments props={p} />
                    }} />
                    <Route exact path='/posts/comments/delete/:commentId' render={(p) => {
                        deleteComment(p)
                        return <Redirect to="/" />
                    }} />

                </Switch>
            </Suspense>
        )
    }
}
export default MyRoutes