var connected = false;

function loginUser() {
    FB.login(function(response) { }, {scope:'email'});
}

function handleStatusChange(response) {
    document.body.className = response.authResponse ? 'connected' : 'not_connected';
    console.log(response);

    if( response.authResponse ) {
        connected = true;

        //updateUserInfo(response);

        //displayFriends();

        //searchUsers();

    } else {
        connected = false;
        //clearUserInfo();
    }
}

function updateUserInfo(response) {
    FB.api('/me', function(response) {
        document.getElementById('user-info').innerHTML = '<img src="https://graph.facebook.com/' + response.id + '/picture">' + response.name;
    });
}

function clearUserInfo() {
    document.getElementById('user-info').innerHTML = '';
}

function displayFriends() {
    FB.api('/me/friends?fields=name,picture', function(response) {
        console.log('Got friends: ', response);

        displayUsers(response);

    });
}

function displayUsers(response) {

    if (!response.error) {
        var markup = '';

        var users = response.data;

        for (var i=0; i < users.length && i < 25; i++) {

            var user = users[i];

            console.log(user);

            markup += '<img src="' + user.picture.data.url + '"> ' + user.name + '<br>';
        }

        document.getElementById('user-suggestions').innerHTML = markup;
    }

}

function searchUsers() {

    console.log('search users');

    /*
    FB.api('/search?q=london&type=user&fields=name,picture,hometown,location', function(response) {

        console.log('response', response);

        displayUsers(response);

    });
    */

}

function goToPage(pageId) {

    $('.page').removeClass('current');

    $('#'+pageId).addClass('current');

}

$(function() {

    $('#interests input[type=checkbox]').click(function() {

        if( $('#interests input:checked').length > 0 ) {

            $('#btnInterestsGo').removeClass('btn-disabled').addClass('btn-primary');

        } else {

            $('#btnInterestsGo').addClass('btn-disabled').removeClass('btn-primary');

        }

    });

});
