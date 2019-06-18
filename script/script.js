import http from "k6/http";
import { check, sleep } from "k6";
export let options = {
  vus: 800,
  duration: "3m",

};

export default function () {
  let id = Math.floor(Math.random() * 10000000);
  let res = http.get(`http://localhost:3000/api/restaurants/${id}/photos`);
  check(res, {
    // eslint-disable-next-line eqeqeq
    "success": (r) => r.status == 200
  });
  sleep(2);
}