import postService from '../../kinvey/post/post-service'
import { toast } from 'react-toastify'

function deletePost(props) {
    const { postId } = props.match.params
    postService.remove(postId)
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                return toast.error(res.description)
            }
            toast.success('Successfully deleted post!')
        })
        .catch(err => toast.error(err.message))
}

export default deletePost