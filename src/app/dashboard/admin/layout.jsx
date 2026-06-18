import { requireRole } from "@/lib/helpers/require-role";

const AdminLayout = async ({ children }) => {
  await requireRole("admin");
  return children;
};

export default AdminLayout;
