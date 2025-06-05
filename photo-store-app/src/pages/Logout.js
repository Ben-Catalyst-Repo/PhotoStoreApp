import { useEffect } from "react"

export default function Logout() {

    useEffect(() => {
        let redirectURL = window.origin + "/__catalyst/auth/login";
        let auth = window.catalyst.auth;
        auth.signOut(redirectURL);
    })
    return null;

}