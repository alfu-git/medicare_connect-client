import PatientProfileCompleteModal from "@/components/dashboardPage/patient/PatientProfileCompleteModal";
import ProfileInCompleteState from "@/components/dashboardPage/shared/ProfileInCompleteState";
import { completePatientProfile } from "@/lib/actions/patient";
import { getUserFromDB } from "@/lib/helpers/get-user";
import { requireRole } from "@/lib/helpers/require-role";

const PatientLayout = async ({ children }) => {
  const user = await getUserFromDB();
  await requireRole("patient");

  const completePatientProfileWrapper = async (updatedData) => {
    "use server";
    return completePatientProfile(user?._id, updatedData);
  };

  if (!user?.profileComplete) {
    return (
      <ProfileInCompleteState
        description={
          "You need to complete your patient profile before accessing dashboard features. This helps doctors trust your profile."
        }
        modal={
          <PatientProfileCompleteModal
            user={user}
            completePatientProfileWrapper={completePatientProfileWrapper}
          />
        }
      />
    );
  }

  return <>{children}</>;
};

export default PatientLayout;
