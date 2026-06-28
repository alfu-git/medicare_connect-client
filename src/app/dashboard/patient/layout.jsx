import PatientProfileCompleteModal from "@/components/dashboardPage/patient/PatientProfileCompleteModal";
import ProfileInCompleteState from "@/components/dashboardPage/shared/ProfileInCompleteState";
import { updatePatientProfile } from "@/lib/actions/patient";
import { getUserFromDB } from "@/lib/helpers/get-user";
import { requireRole } from "@/lib/helpers/require-role";

const PatientLayout = async ({ children }) => {
  const user = await getUserFromDB();
  await requireRole("patient");

  const updatePatientProfileWrapper = async (updatedData) => {
    "use server";
    return updatePatientProfile(user?._id, updatedData);
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
            updatePatientProfileWrapper={updatePatientProfileWrapper}
          />
        }
      />
    );
  }

  return <>{children}</>;
};

export default PatientLayout;
