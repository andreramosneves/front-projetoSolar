interface Pagination<T> {
  data: T[];
  current_page: string;
  next_page:string;
  last_page:string;
  total:string;
}
