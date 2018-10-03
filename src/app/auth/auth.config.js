import { AUTH_CONFIG } from './auth.constant';

export default function AuthConfig($httpProvider, jwtOptionsProvider) {
  jwtOptionsProvider.config({
    whiteListedDomains: AUTH_CONFIG.WHITE_LIST_DOMAIN,
    tokenGetter: () => localStorage.getItem(AUTH_CONFIG.DEFAULT_TOKEN_NAME)
  });
  $httpProvider.interceptors.push('jwtInterceptor');
}

AuthConfig.$inject = ['$httpProvider', 'jwtOptionsProvider'];