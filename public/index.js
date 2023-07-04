const PUBLIC_VAPID_KEY="BI_ljjfKdil3Ca8F1HxX1uClsMMPfhcxx6LUowU6BOLBIyoBq2m9jR3iWpg064OyYCuBTLr7523OVg33bJY6qmU";

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

const subscription = async () => {

    const register = await navigator.serviceWorker.register("/worker.js", {
        scope: "/"
      });
      console.log("New Service Worker");

      console.log("Listening Push Notifications");
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
      });

      

await fetch("/subscription", {
    method: "post",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log("Subscribed!");
};
subscription()

