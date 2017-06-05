export default function ProfileResolve(profileService) {
      return profileService.getProfile().toPromise();
}

ProfileResolve.$inject = ['profileService'];