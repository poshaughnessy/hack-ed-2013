var connected = false;

function loginUser() {
    FB.login(function(response) { }, {scope:'email'});
}

function handleStatusChange(response) {
    document.body.className = response.authResponse ? 'connected' : 'not_connected';
    console.log(response);

    if( response.authResponse ) {
        connected = true;
        updateUserInfo(response);
        displayFriends();
    } else {
        connected = false;
        clearUserInfo();
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

        if (!response.error) {
            var markup = '';

            var friends = response.data;

            for (var i=0; i < friends.length && i < 25; i++) {
                var friend = friends[i];

                markup += '<img src="' + friend.picture.data.url + '"> ' + friend.name + '<br>';
            }

            document.getElementById('friends').innerHTML = markup;
        }
    });
}

