import userService from '../../kinvey/user/user-service'
import { toast } from 'react-toastify'
import observer from '../../observer'

function logout() {
    userService.logout()
        .then(res => {
            if (res.error) {
                return toast.error(res.description)
            }
            sessionStorage.clear()
            toast.success('Successful logout!')
            observer.trigger('logoutUser')  // update Header and Nav component
        })
        .catch(err => toast.error(err.message))
}

export default logout