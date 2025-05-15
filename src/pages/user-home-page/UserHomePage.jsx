import UserHome from "../../components/user-home/UserHome"
import Header from "../../components/header/Header"

const UserHomePage = () => {
  return (
    <div className="user-home">
        <Header /> 
        <UserHome/>
    </div>
  );
};

export default UserHomePage;