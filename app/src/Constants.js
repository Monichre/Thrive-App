export const Constants = {
    signInWithFacebook: () => {
        const provider = new Firebase.auth.FacebookAuthProvider()
        provider.addScope('public_profile, email')
        provider.setCustomParameters({
          'display': 'popup'
        })
    
        firebase.auth().signInWithPopup(provider).then((result) => {
          const token = result.credential.acessToken
          const user = result.user
        })
    }
}