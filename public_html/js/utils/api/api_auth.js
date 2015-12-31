define(['jquery', 'utils/AuthUtils'], function($, util) {
    return (function() {
        var GUEST_SIGNIN_URL = '/api/v1/auth/guest';
        var GOOGLE_SIGNIN_URL = 'https://accounts.google.com/o/oauth2/auth?redirect_uri=http://'+location.host+'/api/v1/auth/signin&response_type=code&client_id=850009735055-9bgmr04im8pp2e6cg203012b2a2gtsoj.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile';
        var LOGOUT_URL = '/api/v1/user/logout';

        var title = 'Авторизация';

        return {
            googleAuth: function() {
                util.openPopup(GOOGLE_SIGNIN_URL, title)
            },
            guestAuth: function() {
                util.openPopup(GUEST_SIGNIN_URL, title)
            },
            logout: function() {
                $.get(LOGOUT_URL);
            }
        }
    })();
});