import React from 'react';


class AuthComponent {

  componentDidMount(){
    window.fbAsyncInit = function() {
      FB.init({
        appId            : '343693149731606',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v3.1'
      });

      window.FB.Event.subscribe('auth.statusChange', (response) => {
        if (response.authResponse) {
          this.updateLoggedInState(response)
        } else {
          this.updateLoggedInState()
        }
      });
    }.bind(this);

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

}
