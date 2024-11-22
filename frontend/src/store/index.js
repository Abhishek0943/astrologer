import { configureStore } from '@reduxjs/toolkit'
import userLogInReducer from '../api/userLogInReducer';
import chatReducer from '../api/chatReducer';
import SocketReducer from '../socket';
import BlogReducer from '../api/BlogReducer';
import Other from '../api/OtherReducer.js';


const store = configureStore({
  reducer: {
    userLog: userLogInReducer,
    blog: BlogReducer,
    chat: chatReducer,
    Socket: SocketReducer,
    other:Other
  }
})
export default store
