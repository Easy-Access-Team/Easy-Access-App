import { cleanup, render, screen } from "@testing-library/react"
import Middleware from "./Index"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

describe("Middleware", () => {
    afterEach(cleanup)
    test("Should render children if middleware validation doesn't activate", ()=>{
        render(<Router>
            <Routes>
                <Route path="/" element={<Middleware validacion={false}><div>Children</div></Middleware>}/>
            </Routes>
        </Router>)
        screen.getByText(/Children/i)
    })
    // test("Should redirect to another page if middleware validation is activated", ()=>{
    //     render(<Router>
    //         <Routes>
    //             <Route path="/" element={<Middleware redirect="/failed" validacion={true} children={<div>Children</div>}/>}/>
    //             <Route path="/failed" element={<div>Failed</div>}/>
    //         </Routes>
    //     </Router>)    
    // })
})