

async function _get() {
  const res = await fetch("https://ipapi.co/json/");
  return res.json();
}

export default {
  _get,
};
