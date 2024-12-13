import React from 'react'
import { useAuthContext } from "../context/AuthContext"
import Swal from 'sweetalert2'

const Logoutbtn = () => {
    const {user, logout} = useAuthContext()
    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to logout?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
          }).then((result) => {
            if (result.isConfirmed) {
                logout();
                Swal.fire({
                    title: "Logout",
                    text: "Logout successfully",
                    icon: "success"
                });
                
            }
        });
    };
  return (
    <button
      onClick={handleLogout}    
      class="bg-gradient-to-r from-red-700 to-purple-300 text-white py-2 px-4 rounded-lg hover:text-black hover:from-blue-300 hover:to-green-300"
    >
      Logout
    </button>
  );
}

export default Logoutbtn
