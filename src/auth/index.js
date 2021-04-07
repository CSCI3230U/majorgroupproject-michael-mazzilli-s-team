/**
 * Authentication wrapper for the Auth0 authentication service
 * Adapted from https://auth0.com/docs/quickstart/spa/vuejs/01-login
 */
import Vue from "vue";
import createAuth0Client from "@auth0/auth0-spa-js";

//default action to take after authentication
const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

let instance

//get the current instance
export const getInstance = () => instance;

//create instance of Auth0 SDK
export const useAuth0 =({
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    redirectUri= window.location.origin,
    ...options
}) => {
    if(instance) return instance;

    //make the instance a vue object
    instance = new Vue({
        data(){
            return {
                loading: true,
                isAuthenticated: false,
                user: {},
                auth0Client: null,
                popupOpen: false,
                error: null
            };
        },
        methods: {
            // Authenticates using a popup window
            async loginWithPopup(options, config) {
                this.popupOpen = true;

                try {
                    await this.auth0Client.loginWithPopup(options, config);
                    this.user = await this.auth0Client.getUser();
                    this.isAuthenticated = await this.auth0Client.isAuthenticated();
                    this.error = null;
                }catch(e){
                    this.error = e;
                    console.log(e);
                }finally {
                    this.popupOpen = false;
                }

                this.user = await this.auth0Client.getUser();
                this.isAuthenticated = true;
            },

            //Handles callback when logging in using a redirect
            async handleRedirectCallback() {
                this.loading = true;
                try {
                    await this.auth0Client.handleRedirectedCallback();
                    this.user = await this.auth0Client.getUser();
                    this.isAuthenticated = true;
                    this.error = null;
                }catch (e) {
                    this.error = e;
                }finally{
                    this.loading = false;
                }
            },

            // Authenticates user using redirect method
            async loginWithRedirect(o){
                var claims = this.auth0Client.loginWithRedirect(o);
                console.log(claims);
                return claims;
            },

            // Returns all claims present in id token
            getIdTokenClaims(o) {
                return this.auth0Client.getIdTokenClaims(o);
            },

            // Returns the access token. returns a new one if the token is invalid or missing 
            getTokenSilently(o){
                return this.auth0Client.getTokenSilently(o);
            },

            // Gets the access token through popup window
            getTokenWithPopup(o) {
                return this.auth0Client.getTokenWithPopup(o);
            },

            // logs the user out, removes their session from authorization server
            logout(o) {
                return this.auth0Client.logout(o);
            }
        },

        // lifecycle method to instantiate sdk client
        async created() {
            //create new instance of sdk client using members of the given options object
            this.auth0Client = await createAuth0Client({
                ...options,
                client_id: options.clientId,
                redirect_uri: redirectUri
            });

            try{
                //If the user is returning to the app after authentication
                if(
                    window.location.search.includes("code=") &&
                    window.location.search.includes("state=")
                ) {
                    //handle the redirect retrieve tokens
                    const { appState } = await this.auth0Client.handleRedirectCallback();

                    this.error = null;

                    //Notify that the redirect callback occurred
                    onRedirectCallback(appState);
                }
            }catch(e){
                this.error = e;
            }finally {
                //Initialize internal authentication state
                this.isAuthenticated = await this.auth0Client.isAuthenticated();
                this.user = await this.auth0Client.getUser();
                this.loading = false;
            }
        }
    });


    return instance;
};

// create vue plugin to expose wrapper object throughout application
export const Auth0Plugin = {
    install(Vue, options) {
        Vue.prototype.$auth = useAuth0(options);
    }
};