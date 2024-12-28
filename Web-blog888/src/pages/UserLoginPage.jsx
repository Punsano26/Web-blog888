import { Navigate } from 'react-router';
import { useAuthContext } from '../context/AuthContext';

const UserLoginPage = ({children}) => {
    const { user } = useAuthContext();
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default UserLoginPage;