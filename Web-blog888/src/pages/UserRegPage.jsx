import { Navigate } from 'react-router';
import { useAuthContext } from '../context/AuthContext';
const UserRegPage = ({children}) => {
    const { user } = useAuthContext();
    if (user) {
        return <Navigate to="/" />;
    }
    return children;
};

export default UserRegPage;