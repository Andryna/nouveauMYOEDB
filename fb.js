<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBSpFFFHCnj1NI40exqbeBf5A_mHXMXTCc",
    authDomain: "forma2p-9ccc5.firebaseapp.com",
    databaseURL: "https://forma2p-9ccc5.firebaseio.com",
    projectId: "forma2p-9ccc5",
    storageBucket: "forma2p-9ccc5.firebasestorage.app",
    messagingSenderId: "531322311665",
    appId: "1:531322311665:web:3c73e205ab53ff4ec0aa50",
    measurementId: "G-R80F799YNH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>