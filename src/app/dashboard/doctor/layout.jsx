import { requireRole } from "@/lib/helpers/require-role";

const DoctorLayout = async ({ children }) => {
  await requireRole("doctor");
  return children;
};

export default DoctorLayout;
