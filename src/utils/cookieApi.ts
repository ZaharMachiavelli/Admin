export const setCookie = (name: string, value: string, options: any = {}) => {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (const [key, value] of Object.entries(options)) {
    updatedCookie += '; ' + key;
    updatedCookie += '=' + value;
  }
  // console.log(updatedCookie);

  document.cookie = updatedCookie;
};
export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
