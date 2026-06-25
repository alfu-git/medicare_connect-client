import DoctorProfileCompleteModal from "@/components/dashboardPage/doctor/doctorProfile/DoctorProfileCompleteModal";
import ProfileInCompleteState from "@/components/shared/dashboard/ProfileInCompleteState";
import { postDoctorData } from "@/lib/actions/doctor";
import { getUser, getUserFromDB } from "@/lib/helpers/get-user";
import { requireRole } from "@/lib/helpers/require-role";

const DoctorLayout = async ({ children }) => {
  const user = await getUser();
  const doctor = await getUserFromDB(user?.id);

  await requireRole("doctor");

  const postDoctorDataFunctionWrapper = async (doctorData) => {
    "use server";
    return await postDoctorData(doctorData);
  };

  if (!doctor?.profileComplete) {
    return (
      <ProfileInCompleteState
        description={
          "You need to complete your doctor profile before accessing dashboard features. This helps patients trust your profile."
        }
        modal={
          <DoctorProfileCompleteModal
            user={user}
            postDoctorDataFunctionWrapper={postDoctorDataFunctionWrapper}
          />
        }
      />
    );
  }

  return <>{children}</>;
};

export default DoctorLayout;
