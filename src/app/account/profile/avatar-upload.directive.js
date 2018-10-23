export default
  function AvatarUploadDirective(profileService) {
    return {
      restrict: 'A',
      scope: {
        onSuccess: "&",
        onError: "&"
      },
      link: (scope, element) => {
        element.bind('change', function () {
          if(element[0].files[0]) {
            const formData = new FormData();
            formData.append('avatar', element[0].files[0]);
            profileService.uploadAvatar(formData).subscribe(
              (data) => scope.onSuccess({data}),
              (error) => scope.onError({error})
            );
          }
        });
      }
    };
  }

AvatarUploadDirective.$inject = ['profileService'];