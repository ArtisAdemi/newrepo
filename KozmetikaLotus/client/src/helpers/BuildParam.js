export default function buildUrl(parameters) {
  var qs = "";
  for (var key in parameters) {
      var value = parameters[key];
      if (value !== null && value !== '') {
          if (key === 'category') {
              // Replace spaces with "-" in the category name
              value = value.replace(/\s/g, '-').toLowerCase();
          }
          qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
      }
  }
  if (qs.length > 0) {
      return qs.substring(0, qs.length - 1); // Remove the last "&"
  }
  return '';
}