import{createBrowserRouter,createRoutesFromElements,Route} from "react-router"
import App from "@/App"
import Signup from "@/components/Signup"

export const router =createBrowserRouter(
    createRoutesFromElements(<>
        <Route path="/" element={<App/>}>

        </Route>
        <Route path="/signup" element={<Signup/>}/>
        </>
    )
)