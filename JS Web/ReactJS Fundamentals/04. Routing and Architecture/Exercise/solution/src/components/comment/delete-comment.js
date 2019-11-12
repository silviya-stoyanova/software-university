import commentService from '../../kinvey/comment/comment-service'
import { toast } from 'react-toastify'

const deleteComment = (props) => {
    const { commentId } = props.match.params
    commentService.remove(commentId)
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                return toast.error(res.description)
            }
            toast.success('Successfully deleted post!')
        })
        .catch(err => toast.error(err.message))
}

export default deleteComment