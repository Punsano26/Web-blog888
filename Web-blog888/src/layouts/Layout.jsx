import { Outlet } from "react-router"
import Nav from "../components/Nav";
import Footer from "../components/Footer";
const Layout = () => {
    return (
      <>
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-700 to-yellow-300">
          <header>
            < Nav /> 
          </header>            
          <main className="flex-grow flex items-center justify-center container min-h-screen mx-auto pt-5 mt-5 sm:p-6 lg:p-8">
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