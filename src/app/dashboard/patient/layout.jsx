import { requireRole } from "@/lib/helpers/require-role";

const PatientLayout = async ({ children }) => {
  await requireRole("patient");
  return children;
};

export default PatientLayout;
