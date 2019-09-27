import axios from 'axios'
import moxios from 'moxios'

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchList } from "./index";

const globalAny: any = global
Object.defineProperty(window, '_env_', {
    writable: true,
    value:{API_URL:"http://"},
 });
  
const mockStore = configureMockStore([thunk]);
describe("User Actions", () => {
   
    let store:any;
  
    beforeEach(() => {
        moxios.install()
        store = mockStore({});
    });
    afterEach(function () {
        moxios.uninstall()
      })
  
    describe("FETCH_LIST action listgameplays", () => {
      it("dispatches FETCH_LIST action and returns data on success",  () => {
          
          moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: [{                
                  "boxes": [
                  {
                    "id": "box0",
                  },
                ],
                "player1": "1"
              }],
            });
          });
         return store.dispatch(fetchList()).then(() => {
            const actions = store.getActions();
            expect.assertions(3);
            expect(actions[0].type).toEqual("FETCH_LIST_REQUEST");
            expect(actions[1].type).toEqual("FETCH_LIST_SUCCESS");
            expect(actions[1].payload[0].player1).toEqual("1");
         })
       
       
      });
  
      it("tests FETCH_LIST action and that returns an error", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 404,
            //  response: {"error":"Something Went Wrong"},
            });
          });
         return store.dispatch(fetchList()).then(() => {
            const actions = store.getActions();
            expect.assertions(3);
            expect(actions[0].type).toEqual("FETCH_LIST_REQUEST");
            expect(actions[1].type).toEqual("FETCH_LIST_FAILURE");
            expect(actions[1].payload.error).toEqual("Request failed with status code 404");
         })
        
      });
    });
  });