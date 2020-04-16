import { Observable, Observer } from "rxjs";
export interface HttpResponse {
  data: string[];
}

const random = (begin: number, end: number) => {
  return begin + Math.floor((end - begin) * Math.random()) + 1;
};

const generateRandomArray = (value: string, length: number): string[] => {
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(value + i);
  }
  return arr;
};

export const mockHttpPost = (value: string): Observable<HttpResponse> => {
  return Observable.create((observer: Observer<HttpResponse>) => {
    let status = "pending";
    const timmer = setTimeout(() => {
      const result = {
        data: generateRandomArray(value, Math.floor(Math.random() * 10)),
      };
      status = "done";
      observer.next(result);
      observer.complete();
    }, random(10, 1000));

    return () => {
      clearTimeout(timmer);
      if (status === "pending") {
        console.warn("post canceled");
      }
    };
  });
};
