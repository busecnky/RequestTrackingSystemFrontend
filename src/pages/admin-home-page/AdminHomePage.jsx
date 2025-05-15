import AdminHome from "../../components/admin-home/AdminHome"
import Header from "../../components/header/Header"

const AdminHomePage = () => {
  return (
    <div className="adminpage">
        <Header /> 
        <AdminHome/>
    </div>
  );
};

export default AdminHomePage;