<template>
  <div class="auth">
    <div class="auth__header">
      <img
        class="auth__header-logo"
        src="../assets/logo.png"
        alt="Writer Logo"
      />
      <h1>Writer</h1>
    </div>

    <div class="auth__sign-in" v-if="!user && !signingIn">
      <input
        class="auth__email"
        type="text"
        v-model="email"
        placeholder="Email"
      />
      <div
        class="auth__sign-in-button"
        @click="
          signingIn = true;
          toggleSignIn();
        "
      >
        Sign in with Email
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";

export default {
  name: "Auth",

  methods: {
    toggleSignIn() {
      if (!firebase.auth().currentUser) {
        const actionCodeSettings = {
          url: window.location.href,
          handleCodeInApp: true
        };
        firebase
          .auth()
          .sendSignInLinkToEmail(this.email, actionCodeSettings)
          .then(() => {
            window.localStorage.setItem("emailForSignIn", this.email);
            alert(
              `An email was sent to ${this.email}. Please use the link in the email to sign in.`
            );
          })
          .catch(error => {
            console.log("signIn");
            this.handleError(error);
          });
      } else {
        firebase
          .auth()
          .signOut()
          .catch(error => {
            console.log("sign out");
            this.handleError(error);
          });
      }
    },

    handleSignIn() {
      if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt(
            "Please provide the email you'd like to sign-in with for confirmation."
          );
        }
        if (email) {
          firebase
            .auth()
            .signInWithEmailLink(email, window.location.href)
            .then(() => {
              window.localStorage.removeItem("emailForSignIn");
            })
            .catch(error => {
              console.log("handleSignIn");
              this.handleError(error);
            });
        }
      }
    },

    async initFirebaseApp() {
      this.email = window.localStorage.getItem("emailForSignIn") || "";
      this.handleSignIn();

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user;
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push({ name: "home", query: {} });
          }
        } else {
          this.user = null;
        }
      });
    },

    handleError(error) {
      alert(`Error: ${error.message}`);
      console.log(error);
    }
  },

  created() {
    this.initFirebaseApp();
  },

  data() {
    return {
      email: "",
      user: null,
      signingIn: false
    };
  }
};
</script>

<style lang="scss">
@import "../scss/variables";

.auth {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  &__header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $theme-color;
    color: white;

    &-logo {
      width: 64px;
      height: 64px;
      margin-right: 8px;
    }
  }

  &__sign-in {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__email {
    font-size: 18px;
    font-family: inherit;
    margin-bottom: 8px;
    box-sizing: border-box;
    border: 1px solid $theme-color;
    min-width: 240px;
    height: 48px;
  }

  &__sign-in-button {
    background-color: $theme-color;
    color: white;
    min-width: 240px;
    height: 48px;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
  }
}
</style>
