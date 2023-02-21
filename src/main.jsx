import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { JournalApp } from "./JournalApp"
import { store } from "./store/store"
import "./style.css"
import "animate.css"

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Provider store={ store }>
            <JournalApp />
        </Provider>
    </BrowserRouter>
)
