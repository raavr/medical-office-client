export default function ProfileResolve(profileService) {
      return profileService.getProfile().toPromise().catch(() => {});
}

ProfileResolve.$inject = ['profileService'];