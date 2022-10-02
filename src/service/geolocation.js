

async function _getCurrentLocation() {
  const res = await fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=448ff6aa8a9b4f84b6934e42836cec97");
  return res.json();
}

export default {
  _getCurrentLocation,
};
