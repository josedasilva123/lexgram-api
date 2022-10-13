type iNextPage = (
  baseURL: string,
  count: number,
  user: string,
  page: string,
  perPage: string,
) => string | false;

export const nextPage: iNextPage = (baseURL, count, user, page, perPage) => {
  const formula = (Number(page) * Number(perPage)) + Number(perPage);

  if (count > formula) {
    return `${baseURL}?user=${user}&page=${Number(page) + 1}&perPage=${perPage}&`;
  } else {
    return false;
  }
};
