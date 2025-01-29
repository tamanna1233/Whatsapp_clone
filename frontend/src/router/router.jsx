import{createBrowserRouter,createRoutesFromElements,Route} from "react-router"
import App from "@/App"
import Signup from "@/components/Signup"
import Signin from "@/components/Signin"

export const router =createBrowserRouter(
    createRoutesFromElements(<>
        <Route path="/" element={<App/>}>

        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        </>
    )
)