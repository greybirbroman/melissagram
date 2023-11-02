import UpdateProfileFrom from "@/components/forms/UpdateProfileFrom"
import PageTitle from "@/components/shared/PageTitle"


const UpdateProfile = () => {
  return (
    <div className="update-profile-container">
      <div className="update-profile-inner_container">
      <PageTitle iconUrl="/assets/icons/edit.svg" title="Edit Profile"/>
      <UpdateProfileFrom />
      </div>
    </div>
  )
}

export default UpdateProfile
