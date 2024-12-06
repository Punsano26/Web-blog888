import { Outlet } from "react-router-dom"
import Nav from "../components/Nav";
import Footer from "../components/Footer";
const Layout = () => {
    return (
      <>
      
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-700 to-yellow-300">
          <Nav />       
        <main className="flex-grow flex items-center justify-center container max-h-screen max-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
        <footer>
            <Footer/>
        </footer>
        </div>
      </>
    );
};
export default Layout;