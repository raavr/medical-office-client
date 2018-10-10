export default function AppInit(notificationSocketService) {
  notificationSocketService.init();
}

AppInit.$inject = ['notificationSocketService'];