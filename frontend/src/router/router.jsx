import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import App from '@/App';
import Signup from '@/components/Signup';
import Signin from '@/components/Signin';
import Chat from '@/components/pages/Chat';
import Status from '@/components/Status';

export const router = createBrowserRouter(
      createRoutesFromElements(
            <>
                  <Route path="/" element={<App />}>
                        <Route index element={<Chat />} />
                        <Route path='/status' element={<Status/>}/>
                        
                  </Route>
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<Signin />} />
            </>,
      ),
);
