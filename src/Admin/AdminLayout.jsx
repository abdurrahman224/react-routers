import { Link, Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdmidNavar from "./AdmidNavar";
import AdmineFooter from "./AdmineFooter";

const AdminLayout = () => {
  return (
    <div>
   
      <AdmidNavar/>
      <Outlet /> 
      <AdmineFooter/>

    </div>
  );
};

export default AdminLayout;
